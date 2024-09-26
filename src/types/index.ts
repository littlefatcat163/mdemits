export type TreeItem = {
    text: string
    id?: string
    isFocusable?: boolean
    href?: string
    items?: TreeItem[]
}