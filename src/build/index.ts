import esbuild from 'esbuild'
import pluginVue from 'esbuild-plugin-mdmits-vue'
import pluginMd from './plugins/pluginMarkdown'
// import pluginCDN from './plugins/pluginCDN'

type BuildOptions = {
    entryPoints: string[]
    mode?: 'development' | 'production'
}

export function build(options: BuildOptions) {
    return esbuild.build({
        entryPoints: options.entryPoints,
        chunkNames: 'chunks/[name]-[hash]',
        outdir: 'distmd',
        bundle: true,
        // splitting: true,
        plugins: [
            pluginVue(),
            pluginMd(),
            /* pluginCDN({
                vue: '/node_modules/vue/dist/vue.esm-browser.js'
            }) */

        ],
        external: ['vue', 'ui'],
        format: 'esm',
        target: [
            'esnext'
        ],
        loader: {
            // '.webp': 'file',
            // '.vue': 'js'
        },
        // logLevel: 'info',
        // sourcemap: true,
        // 默认是true，false表示生成的js文件只写入内存，不写入文件系统
        write: false,
        // minify: true,
    })
}