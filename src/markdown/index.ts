import MarkdownIt from 'markdown-it'
import { frontmatterPlugin } from '@mdit-vue/plugin-frontmatter'
import { headersPlugin, type HeadersPluginOptions } from '@mdit-vue/plugin-headers'
import { slugify } from '@mdit-vue/shared'
import hljs from 'highlight.js'

export const createMarkdownRender = () => {
    const md: MarkdownIt = new MarkdownIt({
        html: true,
        highlight: (code, lang) => {
            if (lang && hljs.getLanguage(lang)) {
                try {
                    return '<pre><code class="hljs">' +
                        hljs.highlight(code, { language: lang, ignoreIllegals: true }).value +
                        '</code></pre>'
                } catch (__) { }
            }
            return '<pre><code class="hljs">' + md.utils.escapeHtml(code) + '</code></pre>'
        }
    })
    md.use(frontmatterPlugin)
    md.use(headersPlugin, {
        levels: [2, 3, 4, 5, 6],
        slugify
    } as HeadersPluginOptions)

    return md
}