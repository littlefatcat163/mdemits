import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import type { MarkdownContainer } from '../../types'

export const imageContainer = (md: MarkdownIt) => {
    md.use(container, 'image', {
        render(tokens, idx) {
            const token = tokens[idx]
            console.log('image container', token.info)
            if (token.nesting === 1) {
                return `<div class="image">\n`
            }
            return '</div>\n'
        },
    } as MarkdownContainer)
}
