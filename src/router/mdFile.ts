import path from 'path'
import type { RouterContext } from '@koa/router'
import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import { createSSRApp } from 'vue'
import { parse } from 'vue/compiler-sfc'
import { renderToString } from 'vue/server-renderer'
import { normalizePath } from 'vite'
import { createMarkdownRender } from '../markdown'
import { htmlTemplate } from '../unitls'
import { build } from '../build'
import { mdEmitsConfig } from '../config'
// import Button from 'primevue/button'
import PrimeVue from 'primevue/config'
import MDHeader from '../layout/components/MDHeader.vue'
import MDContent from '../layout/components/MDContent.vue'
import MDFooter from '../layout/components/MDFooter.vue'

const mdRender = createMarkdownRender()

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
        }
    })
    // app.use(ElementPlus, {size: 'large'})
    // app.provide(ZINDEX_INJECTION_KEY, {current: 0})
    // app.use(Varlet)
    app.use(PrimeVue)
    // app.component('Button', Button)
    return renderToString(app)
}

export async function tsrUrlMdPage(ctx: RouterContext) {
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
}

export async function mdPageIndexTS(ctx: RouterContext) {
    const appVuePath = ctx.path.replace('/index.ts', '.md')
    const { INDEX_TS } = await htmlTemplate()
    ctx.response.type = 'application/javascript; charset=utf-8'
    ctx.body = INDEX_TS.replace(`./MDApp.vue`, appVuePath)
}

export async function buildMdPage(ctx: RouterContext) {
    const filePath = urlToMdFilePath(ctx.path)
    const res = await build({ entryPoints: [filePath] })
    ctx.response.type = 'application/javascript; charset=utf-8'
    ctx.body = res.outputFiles[0].text
}
