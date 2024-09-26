import path from 'path'
import type { RouterContext } from '@koa/router'
import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import { createSSRApp } from 'vue'
import { parse } from 'vue/compiler-sfc'
import { renderToString } from 'vue/server-renderer'
import { normalizePath } from 'vite'
import { createMarkdownRender } from '../markdown'
import { htmlTemplate } from '../handle'
import { build } from '../build'
import { mdEmitsConfig } from '../config'
import * as UI from '../layout/ui'
import type { TreeItem } from '../types'

const navList: TreeItem[] = [
    {
        text: '介绍',
        href: '/info'
    },
    {
        text: '安装',
        items: [
            {
                text: '环境',
                href: '/env'
            },
            {
                text: '软件',
                href: '/soft'
            }
        ]
    },
    {
        text: '极端案例场景',
        items: [
            {
                text: '长标题',
                items: [
                    {
                        text: 'English and how to use this content',
                        href: '/asd'
                    },
                    {
                        text: 'very long, very long, very long, very very very very very very very long long long long',
                        href: '/#/'
                    },
                    {
                        text: '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪。人生得意须尽欢，莫使金樽空对月。',
                        href: '/#/'
                    }
                ]
            },
            {
                text: 'English and how to use this content',
                href: '/#/'
            },
            {
                text: 'very long, very long, very long, very very very very very very very long long long long',
                href: '/#/'
            },
            {
                text: '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪。人生得意须尽欢，莫使金樽空对月。',
                href: '/#/'
            }
        ]
    },
    {
        text: '命令'
    },
    {
        text: '组件',
        items: [
            {
                text: '文字',
                href: '/#'
            },
            {
                text: '按钮',
                href: '/#'
            },
            {
                text: '图片',
                href: '/#'
            },
            {
                text: '卡片',
                href: '/#'
            },
            {
                text: '手风琴',
                href: '/#'
            },
            {
                text: '折叠',
                href: '/#'
            },
            {
                text: '提示框',
                href: '/#'
            }
        ]
    }
]
const tocList: TreeItem[] = [
    {
        text: 'title1',
        href: '#',
        items: [
            {
                text: 'ttile1-1',
            },
            {
                text: 'ttile1-2',
            },
            {
                text: 'ttile1-3',
            },
        ],
    },
    {
        text: 'title2',
        items: [
            {
                text: 'ttile2-1',
            },
            {
                text: 'ttile2-2',
            },
            {
                text: 'ttile2-3',
            },
        ],
    },
]

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
            ...UI
        },
        data() {
            return {
                activeNavMenu: false,
                activeNavToc: false,
                navList,
                tocList
            }
        },
        methods: {
            inactive() {}
        }
    })
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
    ctx.body = INDEX_TS.replace(`./tmp_app.vue`, appVuePath)
}

export async function buildMdPage(ctx: RouterContext) {
    const filePath = urlToMdFilePath(ctx.path)
    const res = await build({ entryPoints: [filePath] })
    ctx.response.type = 'application/javascript; charset=utf-8'
    ctx.body = res.outputFiles[0].text
}
