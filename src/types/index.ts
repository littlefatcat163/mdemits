export type SideBar = {
    text: string
    href?: string
    items?: SideBar[]
}

export type TocItem = {
    title: string
    href?: string
    children?: TocItem[]
}