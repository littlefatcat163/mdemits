import type MarkdownIt from 'markdown-it'

export const htmlPlugin = (md: MarkdownIt) => {
    const defaultRender = md.renderer.rules.html_block!
    md.renderer.rules.html_block = (tokens, idx, options, env, self) => {
        const { type, content } = tokens[idx]
        if (type === 'html_block' && content.startsWith('<!--')) {
            return ''
        }
        return defaultRender(tokens, idx, options, env, self)
    }
}
