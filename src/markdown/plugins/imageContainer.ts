import type MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import type { MarkdownContainer } from '../../types'

export const imageContainer = (md: MarkdownIt) => {
    md.use(container, 'tabs', {
        render(tokens, idx) {
            const token = tokens[idx]
            if (token.nesting === 1) {
                return `<div class="tabs">\n`
            }
            return '</div>\n'
        },
    } as MarkdownContainer)

    md.use(container, 'tabpane', {
        render(tokens, idx) {
            const token = tokens[idx]
            // console.log('tabpane container', token.info)
            if (token.nesting === 1) {
                return `<div class="tabpane">\n`
            }
            return '</div>\n'
        },
    } as MarkdownContainer)
}
