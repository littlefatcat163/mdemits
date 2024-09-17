export type NavTreeItem = {
    text: string
    href?: string
    items?: NavTreeItem[]
}

export type TocItem = {
    title: string
    href?: string
    children?: TocItem[]
}