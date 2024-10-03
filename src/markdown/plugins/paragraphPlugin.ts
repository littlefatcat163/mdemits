import type MarkdownIt from 'markdown-it'
import type Token from 'markdown-it/lib/token.mjs'

const hasImage = (token: Token) => {
    if (!token) {
        return false
    }
    return (
        token.type === 'inline' &&
        token.children?.some((item) => item.type === 'image')
    )
}

export const paragraphPlugin = (md: MarkdownIt) => {
    md.renderer.rules.paragraph_open = (tokens, idx, options, env, self) => {
        if (hasImage(tokens[idx + 1])) {
            return ''
        }
        return '<p>'
    }

    md.renderer.rules.paragraph_close = (tokens, idx, options, env, self) => {
        if (hasImage(tokens[idx - 1])) {
            return ''
        }
        return '</p>'
    }
}
