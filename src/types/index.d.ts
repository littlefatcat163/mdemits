import type { RenderRule } from 'markdown-it/lib/renderer.mjs'

export type TreeItem = {
    text: string
    id?: string
    isFocusable?: boolean
    href?: string
    items?: TreeItem[]
}

export type ImageGroupItem = {
    alt: string
    src: string
    width: number
    height: number
}

export type MarkdownContainer = {
    render: RenderRule
}

export type MarkdownEnv = {
    // frontmatter?: Record<string, unknown>
    // headers?: Header[]
    sourcePath: string
    frontmatter: {
        title: string
        excerpt: string
        bannerImg: string
    }
}

export type MarkdownAppVueEnv = {
    navList: TreeItem[]
    tocList: TreeItem[]
    title: string
    dateTime: string
    birthTime: string
    bannerImg: string
    words: string
    minutes: number
    mTime: string
}

export type SizeConfig = {
    root?: string
    name?: string
    language?: string
    dateFormat?: string
    sidebar?: TreeItem[]
}