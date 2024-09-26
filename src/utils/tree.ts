import type { TreeItem } from '../types'

export function treeNodeRegisterId(data: TreeItem[]): TreeItem[] {
    const queue = [{ node: data, prefix: '' }] // 初始队列，包含根节点和其层级

    while (queue.length > 0) {
        const { node, prefix } = queue.shift()! // 获取队列中的第一个节点

        // 遍历节点的每一项
        node.forEach((item, index) => {
            item.id = `${prefix}${index}` // 分配唯一的id

            // 如果有子节点，推入队列并更新前缀
            if (Array.isArray(item.items)) {
                queue.push({ node: item.items, prefix: `${prefix}${index}-` })
            }
        })
    }

    return data
}

export function treeNodeExpand(data: TreeItem[], href: string) {
    let collapseds: Set<string> = new Set()
    type TreeStack = {
        node: TreeItem
        parents: string[]
    }
    let stack: TreeStack[] = data.map((node) => ({ node, parents: [] }))
    while (stack.length > 0) {
        const { node, parents } = stack.pop()!
        if (node.href === href) {
            node.isFocusable = true
            collapseds = new Set(parents)
            stack = []
            break
        }
        if (Array.isArray(node.items)) {
            node.items.forEach((child) =>
                stack.push({ node: child, parents: [...parents, node.id!] })
            )
        }
    }
    return collapseds
}
