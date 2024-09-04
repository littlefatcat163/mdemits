import Koa from 'koa'
import Router from 'koa-router'
import os from 'os'
import chalk from 'chalk'
import path from 'path'
import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import { createSSRApp } from 'vue'
import { parse } from 'vue/compiler-sfc'
import { renderToString } from 'vue/server-renderer'
import { normalizePath } from 'vite'
import { mdEmitsConfig } from './config'
import { createMarkdownRender } from './markdown'
// import ElementPlus, {ZINDEX_INJECTION_KEY} from 'element-plus'
import Varlet from '@varlet/ui'
import MDHeader from './layout/components/MDHeader.vue'
import MDContent from './layout/components/MDContent.vue'
import MDFooter from './layout/components/MDFooter.vue'
import { joinCwdPath, htmlTemplate } from './unitls'
import { build } from './build'

function printUrls(port: number) {
    const interfaces = os.networkInterfaces()
    const addresses = []

    for (let interfaceName in interfaces) {
        for (let iface of interfaces[interfaceName]!) {
            if (iface.family === 'IPv4' && !iface.internal) {
                addresses.push(iface.address)
            }
        }
    }

    console.log(chalk.bold(`Server is running!`))
    console.log(
        `  ${chalk.bold(chalk.greenBright('➜'))}  Local:   ${chalk.cyan(
            `http://localhost:${port}/`
        )}`
    )

    if (addresses.length > 0) {
        addresses.forEach((address) => {
            console.log(
                `  ${chalk.bold(chalk.greenBright('➜'))}  Network: ${chalk.cyan(
                    `http://${address}:${port}/`
                )}`
            )
        })
    }
}

type ServerOptions = {
    port?: number
    hostname?: string
}

type ServerResult = {
    printUrls: () => void
}

function urlToMdFilePath(url: string) {
    if (/\.md$/.test(url)) {
        return normalizePath(path.join(mdEmitsConfig.root, url))
    } else {
        return normalizePath(path.join(mdEmitsConfig.root, url + '.md'))
    }

    /* if (/[\/]$/.test(url)) {
        return normalizePath(path.join(mdEmitsConfig.root, url, 'index.md'))
    } else {
        return normalizePath(path.join(mdEmitsConfig.root, url + '.md'))
    } */
}

function ssr(mdHtml: string, LAYOUT_VUE_TEMPLATE: string) {
    const template = LAYOUT_VUE_TEMPLATE.replace('<!-- Markdown -->', mdHtml)
    const { descriptor } = parse(template)
    const app = createSSRApp({
        template: descriptor.template?.content,
        components: {
            MDHeader,
            MDContent,
            MDFooter,
        },
    })
    // app.use(ElementPlus, {size: 'large'})
    // app.provide(ZINDEX_INJECTION_KEY, {current: 0})
    app.use(Varlet)
    return renderToString(app)
}

function createRouter() {
    const mdRender = createMarkdownRender()
    const router = new Router()
    router.get(/^\/node_modules\/.+$/, async (ctx) => {
        let responseType = 'application/javascript; charset=utf-8'
        if (/.css$/.test(ctx.path)) {
            responseType = 'text/css; charset=utf-8'
        }
        const targetFile = await readFile(joinCwdPath(ctx.path), 'utf8')
        ctx.response.type = responseType
        ctx.body = targetFile
    })
    router.get(/\.md$/, async (ctx) => {
        const filePath = urlToMdFilePath(ctx.path)
        const res = await build({ entryPoints: [filePath] })
        ctx.response.type = 'application/javascript; charset=utf-8'
        ctx.body = res.outputFiles[0].text
    })
    router.get(/\/index\.ts$/, async (ctx) => {
        const appVuePath = ctx.path.replace('/index.ts', '.md')
        const { INDEX_TS } = await htmlTemplate()
        ctx.response.type = 'application/javascript; charset=utf-8'
        ctx.body = INDEX_TS.replace(`./MDApp.vue`, appVuePath)
    })
    router.get(/^\/[^.]*$/, async (ctx) => {
        const filePath = urlToMdFilePath(ctx.path)
        const fileExists = existsSync(filePath)
        if (!fileExists) {
            ctx.status = 404
            ctx.body = 'Not Found'
            return
        }
        const mdContent = await readFile(filePath, 'utf8')
        const mdHtml = mdRender.render(mdContent)
        const { INDEX_HTML, LAYOUT_VUE_TEMPLATE } = await htmlTemplate()
        const ssrHtml = await ssr(mdHtml, LAYOUT_VUE_TEMPLATE)
        const html = INDEX_HTML.replace('<!-- SSR -->', ssrHtml).replace(
            `./index.ts`,
            path.join(ctx.path, 'index.ts')
        )
        ctx.response.type = 'text/html; charset=utf-8'
        ctx.body = html
    })
    return router
}

export function createServer({
    port = 5194,
    hostname = '0.0.0.0',
}: ServerOptions) {
    return new Promise<ServerResult>((resolve, reject) => {
        const app = new Koa()
        const router = createRouter()
        app.use(router.routes())
        app.use(router.allowedMethods())
        app.on('error', (err) => {
            reject(err)
            console.error(`${chalk.red('Server error:')} ${err}`)
        })
        const server = app.listen(port, hostname)
        server.on('listening', () => {
            resolve({
                printUrls: () => printUrls(port),
            })
        })
        server.on('error', (err) => {
            reject(err)
        })
    })
}
