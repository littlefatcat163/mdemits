import { loadEntry } from 'esbuild-plugin-mdmits-vue/dist/entry.js'
import esbuild from 'esbuild'
import { readFile } from 'fs/promises'
import { createMarkdownRender, mdImgPath, defineConst } from '../../markdown'
import { wordCountAndTime } from '../../utils/word'
import { joinMdemitsDistPath, fileDate } from '../../handle'
import type { MarkdownEnv, MarkdownAppVueEnv, TreeItem } from '../../types'

const mdRender = createMarkdownRender()

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

export default function pluginMarkdown(): esbuild.Plugin {
    return {
        name: 'esbuild-plugin-markdown',
        setup(build) {
            build.onLoad({ filter: /\.md$/ }, async (args) => {
                const markdownContent = await readFile(args.path, 'utf8')
                const markdownEnv: MarkdownEnv = {
                    sourcePath: args.path,
                    frontmatter: {
                        title: '',
                        excerpt: '',
                        bannerImg: '',
                    },
                }
                const htmlContent = mdRender.render(
                    markdownContent,
                    markdownEnv
                )
                const mdAppVuePath = joinMdemitsDistPath('layout/tmp_app.vue')
                const { words, minutes } = wordCountAndTime(htmlContent)
                const { birthTime, dateTime, mTime } = await fileDate(args.path)
                const mdVueEnv: MarkdownAppVueEnv = {
                    // navList: treeNodeRegisterId(navList),
                    // tocList: treeNodeRegisterId(tocList),
                    navList,
                    tocList,
                    birthTime,
                    dateTime,
                    mTime,
                    words,
                    minutes,
                    title: markdownEnv.frontmatter.title,
                    bannerImg: mdImgPath(markdownEnv.frontmatter.bannerImg),
                }
                const MD_APP_VUE = await readFile(mdAppVuePath, 'utf8')
                const data = defineConst(mdVueEnv)
                const mdVue = MD_APP_VUE.replace('/* data */', data).replace(
                    '<!-- Markdown -->',
                    htmlContent
                )
                const { code, errors } = loadEntry(mdVue, mdAppVuePath, false)
                return {
                    contents: code,
                    errors,
                }
            })
        },
    }
}
