import path from 'path'
import type { RouterContext } from '@koa/router'
import { existsSync } from 'fs'
import { readFile } from 'fs/promises'
import { createSSRApp } from 'vue'
import { parse } from 'vue/compiler-sfc'
import { renderToString } from 'vue/server-renderer'
import { normalizePath } from 'vite'
import { createMarkdownRender, mdImgPath } from '../markdown'
import { htmlTemplate, fileDate } from '../handle'
import { wordCountAndTime } from '../utils/word'
import { build } from '../build'
import { sizeConfig } from '../config'
// @ts-ignore
import * as UI from 'ui'
import type { TreeItem, MarkdownEnv, MarkdownAppVueEnv } from '../types'

const navList: TreeItem[] = [
    { text: '介绍', href: '/info', id: '0' },
    {
        text: '安装',
        items: [
            { text: '环境', href: '/env', id: '1-0' },
            { text: '软件', href: '/soft', id: '1-1' },
        ],
        id: '1',
    },
    {
        text: '极端案例场景',
        items: [
            {
                text: '长标题',
                items: [
                    {
                        text: 'English and how to use this content',
                        href: '/asd',
                        id: '2-0-0',
                    },
                    {
                        text: 'very long, very long, very long, very very very very very very very long long long long',
                        href: '/#/',
                        id: '2-0-1',
                    },
                    {
                        text: '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪。人生得意须尽欢，莫使金樽空对月。',
                        href: '/#/',
                        id: '2-0-2',
                    },
                ],
                id: '2-0',
            },
            {
                text: 'English and how to use this content',
                href: '/#/',
                id: '2-1',
            },
            {
                text: 'very long, very long, very long, very very very very very very very long long long long',
                href: '/#/',
                id: '2-2',
            },
            {
                text: '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪。人生得意须尽欢，莫使金樽空对月。',
                href: '/#/',
                id: '2-3',
            },
        ],
        id: '2',
    },
    { text: '命令', id: '3' },
    {
        text: '组件',
        items: [
            { text: '文字', href: '/#', id: '4-0' },
            { text: '按钮', href: '/#', id: '4-1' },
            { text: '图片', href: '/#', id: '4-2' },
            { text: '卡片', href: '/#', id: '4-3' },
            { text: '手风琴', href: '/#', id: '4-4' },
            { text: '折叠', href: '/#', id: '4-5' },
            { text: '提示框', href: '/#', id: '4-6' },
        ],
        id: '4',
    },
]
const tocList: TreeItem[] = [
    {
        text: 'title1',
        href: '#',
        items: [
            { text: 'ttile1-1', id: '0-0' },
            { text: 'ttile1-2', id: '0-1' },
            { text: 'ttile1-3', id: '0-2' },
        ],
        id: '0',
    },
    {
        text: 'title2',
        items: [
            {
                text: 'ttile2-1',
                href: '#title2-1',
                id: '1-0',
                isFocusable: true,
            },
            { text: 'ttile2-2', id: '1-1' },
            { text: 'ttile2-3', id: '1-2' },
        ],
        id: '1',
    },
]

const mdRender = createMarkdownRender()

function urlToMdFilePath(url: string) {
    if (/\.md$/.test(url)) {
        return normalizePath(path.join(sizeConfig.root!, url))
    } else {
        return normalizePath(path.join(sizeConfig.root!, url + '.md'))
    }

    /* if (/[\/]$/.test(url)) {
        return normalizePath(path.join(sizeConfig.root, url, 'index.md'))
    } else {
        return normalizePath(path.join(sizeConfig.root, url + '.md'))
    } */
}

function ssr(
    mdHtml: string,
    LAYOUT_VUE_TEMPLATE: string,
    mdEnv: MarkdownAppVueEnv
) {
    const template = LAYOUT_VUE_TEMPLATE.replace('<!-- Markdown -->', mdHtml)
    const { descriptor } = parse(template)
    const app = createSSRApp({
        template: descriptor.template?.content,
        components: {
            ...UI,
        },
        data() {
            return {
                activeNavMenu: false,
                activeNavToc: false,
                ...mdEnv,
            }
        },
        methods: {
            inactive() {},
        },
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
    const { birthTime, dateTime, mTime } = await fileDate(filePath)
    const mdContent = await readFile(filePath, 'utf8')
    const markdownEnv: MarkdownEnv = {
        sourcePath: filePath,
        frontmatter: {
            title: '',
            excerpt: '',
            bannerImg: '',
        },
    }
    const mdHtml = mdRender.render(mdContent, markdownEnv)
    const { INDEX_HTML, LAYOUT_VUE_TEMPLATE } = await htmlTemplate()
    const frontmatter = markdownEnv.frontmatter
    const { words, minutes } = wordCountAndTime(mdHtml)
    const ssrHtml = await ssr(mdHtml, LAYOUT_VUE_TEMPLATE, {
        navList,
        tocList,
        birthTime,
        dateTime,
        mTime,
        words,
        minutes,
        title: frontmatter.title,
        bannerImg: mdImgPath(frontmatter.bannerImg),
    })
    const html = INDEX_HTML.replace('<!-- title -->', frontmatter.title)
        .replaceAll('<!-- excerpt -->', frontmatter.excerpt)
        .replace('<!-- SSR -->', ssrHtml)
        .replace(`./index.ts`, path.join(ctx.path, 'index.ts'))
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
