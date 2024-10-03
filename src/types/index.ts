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