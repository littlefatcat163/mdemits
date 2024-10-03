import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'
import { inspect } from 'util'
import { joinSuPath, joinCwdPath } from '../../handle'
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
                console.log(suPath)
                const size = sizeOf(suPath)
                width = size.width!
                height = size.height!
            } catch (error) {
                console.error('has err', error)
            }
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
        return `\n<MDEImageGroup :list="${inspect(list)}" />\n`
    }
}
