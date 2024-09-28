import { readFileSync, readdirSync } from 'fs'
import type { Plugin } from 'vite'
import { minify } from 'html-minifier'

export function findSvg(dir: string) {
    const svgs: string[] = []
    const dirents = readdirSync(dir, {
        withFileTypes: true,
    })

    for (const dirent of dirents) {
        if (dirent.isFile() && /.svg$/.test(dirent.name)) {
            const id = dirent.name.replace(/.svg$/, '')
            const svg = readFileSync(dir + '/' + dirent.name)
                .toString()
                .replace(
                    /xmlns="[^"]+"|width="[^"]+"|height="[^"]+"|class="[^"]+"/g,
                    ''
                )
                .replace('<svg', `<symbol id="${id}"`)
                .replace('</svg>', '</symbol>')

            svgs.push(
                minify(svg, {
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    keepClosingSlash: true
                })
            )
        }
    }

    return svgs
}

export default function vitePluginSvg(dir: string): Plugin {
    return {
        name: 'svg-transform',
        transformIndexHtml(html: string): string {
            return html.replace(
                '<!-- svg-defs -->',
                `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="display:none;overflow:hidden;width:0;height:0"><defs>${findSvg(
                    dir
                ).join('')}</defs></svg>`
            )
        },
    }
}
