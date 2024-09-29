import type MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import chalk from 'chalk'

export const highlightPlugin = (md: MarkdownIt) => {
    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const lang = token.info.trim()
        const code = token.content
        let highlightCode: string
        if (lang && hljs.getLanguage(lang)) {
            try {
                highlightCode = hljs.highlight(code, {
                    language: lang,
                    ignoreIllegals: true,
                }).value
            } catch (error) {
                console.warn(chalk.yellow('highlight code error:'), error)
                highlightCode = md.utils.escapeHtml(code)
            }
        } else {
            highlightCode = md.utils.escapeHtml(code)
        }
        return `<MDECode lang="${lang}"><pre><div class="hljs">${highlightCode}</div></pre></MDECode>`
    }
}
