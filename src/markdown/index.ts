import MarkdownIt from 'markdown-it'
import { inspect } from 'util'
import { frontmatterPlugin } from '@mdit-vue/plugin-frontmatter'
import {
    headersPlugin,
    type HeadersPluginOptions,
} from '@mdit-vue/plugin-headers'
import { highlightPlugin } from './plugins/highlightPlugin'
import { imagePlugin } from './plugins/imagePlugin'
import { paragraphPlugin } from './plugins/paragraphPlugin'
import { htmlPlugin } from './plugins/htmlPlugin'
import { imageContainer } from './plugins/imageContainer'
import { slugify } from '@mdit-vue/shared'
import { nodeModuleMdemitsDist } from '../handle' 

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
    md.use(htmlPlugin)

    return md
}

export const mdImgPath = (mdImg: string) => {
    const match = /!\[\]\((.*?)\s*(".*?")?\)/.exec(mdImg)
    if (Array.isArray(match) && match.length > 1) {
        return match[1]
    }
    return nodeModuleMdemitsDist('layout/imgs/default.jpg')
}

export const defineConst = (obj: Record<string, unknown>) => {
    const consts = []
    for (let k in obj) {
        consts.push(`const ${k} = ${inspect(obj[k], false, 5)}`)
    }
    return consts.join('\n')
}