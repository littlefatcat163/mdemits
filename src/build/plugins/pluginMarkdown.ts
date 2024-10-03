import { loadEntry } from 'esbuild-plugin-mdmits-vue/dist/entry.js'
import esbuild from 'esbuild'
import { readFile } from 'fs/promises'
import { createMarkdownRender } from '../../markdown'
import { joinMdemitsDistPath } from '../../handle'
import type { MarkdownEnv } from '../../types'

const mdRender = createMarkdownRender()

export default function pluginMarkdown(): esbuild.Plugin {
    return {
        name: 'esbuild-plugin-markdown',
        setup(build) {
            build.onLoad({ filter: /\.md$/ }, async (args) => {
                const markdownContent = await readFile(args.path, 'utf8')
                const markdownEnv: MarkdownEnv = {
                    sourcePath: args.path,
                }
                const htmlContent = mdRender.render(markdownContent, markdownEnv)
                const mdAppVuePath = joinMdemitsDistPath('layout/tmp_app.vue')
                const MD_APP_VUE = await readFile(mdAppVuePath, 'utf8')
                const mdVue = MD_APP_VUE.replace(
                    '<!-- Markdown -->',
                    htmlContent
                )
                const { code, errors } = loadEntry(mdVue, mdAppVuePath, false)
                return {
                    contents: code,
                    errors,
                }
            })
        },
    }
}
