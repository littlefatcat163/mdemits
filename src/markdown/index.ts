import MarkdownIt from 'markdown-it'
import { frontmatterPlugin } from '@mdit-vue/plugin-frontmatter'
import {
    headersPlugin,
    type HeadersPluginOptions,
} from '@mdit-vue/plugin-headers'
import { highlightPlugin } from './plugins/highlightPlugin'
import { slugify } from '@mdit-vue/shared'

export const createMarkdownRender = () => {
    const md: MarkdownIt = new MarkdownIt({
        html: true,
    })
    md.use(frontmatterPlugin)
    md.use(headersPlugin, {
        levels: [2, 3, 4, 5, 6],
        slugify,
    } as HeadersPluginOptions)
    md.use(highlightPlugin)

    return md
}
