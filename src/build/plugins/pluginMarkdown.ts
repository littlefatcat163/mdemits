import { loadEntry } from 'esbuild-plugin-mdmits-vue/dist/entry.js'
import esbuild from 'esbuild'
import { readFile } from 'fs/promises'
import { createMarkdownRender, mdImgPath, defineConst } from '../../markdown'
import { treeNodeRegisterId } from '../../utils/tree'
import { joinMdemitsDistPath, fileDate } from '../../handle'
import type { MarkdownEnv, MarkdownAppVueEnv, TreeItem } from '../../types'

const mdRender = createMarkdownRender()

const navList: TreeItem[] = [
    {
        text: '介绍',
        href: '/info',
    },
    {
        text: '安装',
        items: [
            {
                text: '环境',
                href: '/env',
            },
            {
                text: '软件',
                href: '/soft',
            },
        ],
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
                    },
                    {
                        text: 'very long, very long, very long, very very very very very very very long long long long',
                        href: '/#/',
                    },
                    {
                        text: '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪。人生得意须尽欢，莫使金樽空对月。',
                        href: '/#/',
                    },
                ],
            },
            {
                text: 'English and how to use this content',
                href: '/#/',
            },
            {
                text: 'very long, very long, very long, very very very very very very very long long long long',
                href: '/#/',
            },
            {
                text: '君不见黄河之水天上来，奔流到海不复回。君不见高堂明镜悲白发，朝如青丝暮成雪。人生得意须尽欢，莫使金樽空对月。',
                href: '/#/',
            },
        ],
    },
    {
        text: '命令',
    },
    {
        text: '组件',
        items: [
            {
                text: '文字',
                href: '/#',
            },
            {
                text: '按钮',
                href: '/#',
            },
            {
                text: '图片',
                href: '/#',
            },
            {
                text: '卡片',
                href: '/#',
            },
            {
                text: '手风琴',
                href: '/#',
            },
            {
                text: '折叠',
                href: '/#',
            },
            {
                text: '提示框',
                href: '/#',
            },
        ],
    },
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
                const { birthTime, dateTime, mTime } = await fileDate(args.path)
                const mdVueEnv: MarkdownAppVueEnv = {
                    // navList: treeNodeRegisterId(navList),
                    // tocList: treeNodeRegisterId(tocList),
                    navList,
                    tocList,
                    birthTime,
                    dateTime,
                    mTime,
                    title: markdownEnv.frontmatter.title,
                    word: '300 words',
                    readTime: '6 mins',
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
