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
import { Layout } from 'ant-design-vue'
import Header from './layout/components/Header.vue'
import Content from './layout/components/Content.vue'
import Footer from './layout/components/Footer.vue'
// @ts-ignore
import LayoutVue from './layout/components/Laydout.vue?type=text'

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
    console.log(`  ${chalk.bold(chalk.greenBright('➜'))}  Local:   ${chalk.cyan(`http://localhost:${port}/`)}`)

    if (addresses.length > 0) {
        addresses.forEach(address => {
            console.log(`  ${chalk.bold(chalk.greenBright('➜'))}  Network: ${chalk.cyan(`http://${address}:${port}/`)}`)
        });
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
    if (/[\/]$/.test(url)) {
        return normalizePath(path.join(mdEmitsConfig.root, url, 'index.md'))
    } else {
        return normalizePath(path.join(mdEmitsConfig.root, url + '.md'))
    }
}

function ssr(mdHtml: string) {
    const { descriptor } = parse(LayoutVue)
    const app = createSSRApp({
        template: descriptor.template?.content,
        components: {
            Header,
            Content,
            Footer
        }
    })
    app.use(Layout)
    return renderToString(app)
}

function createRouter() {
    const mdRender = createMarkdownRender()
    const router = new Router()
    router.get(/^\/@node_modules\/.+$/, (ctx) => {
        ctx.status = 200
        ctx.body = 'ok there is node_modules'
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
        const html = await ssr(mdHtml)
        ctx.status = 200
        ctx.headers['Content-Type'] = 'text/html'
        ctx.body = html
    })
    return router
}

export function createServer({ port = 5194, hostname = '0.0.0.0' }: ServerOptions) {
    return new Promise<ServerResult>((resolve, reject) => {
        const app = new Koa()
        const router = createRouter()
        app.use(router.routes())
        app.use(router.allowedMethods())
        app.on('error', (err) => {
            reject(err)
            console.error(`${chalk.red('Server error:')} ${err}`)
        })
        const server = app.listen(port, hostname, () => {
            printUrls(port)
        })
        server.on('listening', () => {
            resolve({
                printUrls: () => printUrls(port)
            })
        })
        server.on('error', (err) => {
            reject(err)
        })
    })
}