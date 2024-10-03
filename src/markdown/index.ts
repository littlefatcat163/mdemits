import MarkdownIt from 'markdown-it'
import { frontmatterPlugin } from '@mdit-vue/plugin-frontmatter'
import {
    headersPlugin,
    type HeadersPluginOptions,
} from '@mdit-vue/plugin-headers'
import { highlightPlugin } from './plugins/highlightPlugin'
import { imagePlugin } from './plugins/imagePlugin'
import { paragraphPlugin } from './plugins/paragraphPlugin'
import { imageContainer } from './plugins/imageContainer'
import { slugify } from '@mdit-vue/shared'

export const createMarkdownRender = () => {
    const md: MarkdownIt = new MarkdownIt({
        html: true,
        breaks: true
    })
    md.use(frontmatterPlugin)
    md.use(headersPlugin, {
        levels: [2, 3, 4, 5, 6],
        slugify,
    } as HeadersPluginOptions)
    md.use(highlightPlugin)
    md.use(imagePlugin)
    md.use(imageContainer)
    md.use(paragraphPlugin)

    return md
}