import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'
import { inspect } from 'util'
import type { ImageGroupItem } from '../../types'

function toImages(tokens: Token[]) {
    const imageItems: ImageGroupItem[] = []
    tokens.forEach((token) => {
        if (token.type === 'image') {
            imageItems.push({
                src: token.attrGet('src')!,
                alt: token.content,
                width: 350,
                height: 750,
            })
        }
    })
    return imageItems
}

export const imagePlugin = (md: MarkdownIt) => {
    md.renderer.rules.image = (tokens, idx, options, env, self) => {
        if (idx !== 0) {
            return ''
        }

        const list = toImages(tokens)
        return `\n<MDEImageGroup :list="${inspect(list)}" />\n`
    }
}
