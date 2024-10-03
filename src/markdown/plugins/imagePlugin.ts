import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'
import { inspect } from 'util'
import { joinSuPath } from '../../handle'
import sizeOf from 'image-size'
import type { ImageGroupItem, MarkdownEnv } from '../../types'

function toImages(tokens: Token[], sourcePath: string) {
    const imageItems: ImageGroupItem[] = []
    tokens.forEach((token) => {
        if (token.type === 'image') {
            const src = token.attrGet('src')!
            let width = 404
            let height = 404
            try {
                const suPath = joinSuPath(sourcePath, src)
                const size = sizeOf(suPath)
                width = size.width!
                height = size.height!
            } catch (error) {}
            imageItems.push({
                src,
                alt: token.content,
                width,
                height,
            })
        }
    })
    return imageItems
}

/**
 * @description 多图片，一行放几张图
 *  - 1. 一行最多三张
 *  - 2. 根据图片数量，尽量铺满的方式去计算一行该放多少
 *  - 3. 只处理图片两行没铺满，剩余多的case
 * @param {number} imageCount 图片数量
 * @returns
 */
function igRowCol(imageCount: number) {
    const MAX = 3
    if (imageCount < MAX) {
        return imageCount
    }
    if (imageCount === MAX + 1) {
        return MAX - 1
    }
    return MAX
}

export const imagePlugin = (md: MarkdownIt) => {
    md.renderer.rules.image = (
        tokens,
        idx,
        options,
        env: MarkdownEnv,
        self
    ) => {
        if (idx !== 0) {
            return ''
        }

        const list = toImages(tokens, env.sourcePath)
        const rowCol = igRowCol(list.length)
        return `\n<MDEImageGroup :rowCol="${rowCol}" :list="${inspect(
            list
        )}" />\n`
    }
}
