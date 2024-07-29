import esbuild from 'esbuild'
import { clean } from 'esbuild-plugin-clean'
import { readFile } from 'fs/promises'
import path from 'path'
import pluginVue from 'esbuild-plugin-vue-next'

(async () => {
    const res = await readFile(path.resolve('package.json'), 'utf-8');
    const pkg = JSON.parse(res);
    await esbuild.build({
        entryPoints: ['./src/index.ts', './src/cli.ts'],
        chunkNames: 'chunks/[name]-[hash]',
        outdir: 'dist',
        splitting: true,
        bundle: true,
        format: 'esm',
        target: ['esnext', 'node18'],
        platform: 'node',
        logLevel: 'info',
        sourcemap: false,
        // minify: true,
        loader: {
            // '.node': 'file'
        },
        external: [
            ...Object.keys(pkg.dependencies),
        ],
        plugins: [
            clean({
                patterns: ['./dist/*', './dist/assets/*.map.js']
            }),
            pluginVue(),
            {
                name: 'vue-text',
                setup(build) {
                    build.onResolve({filter: /\.*\?type=text/}, args => ({
                        path: args.path,
                        namespace: 'vue-text'
                    }))
                    build.onLoad({filter: /\.*\?type=text/, namespace: 'vue-text'}, async (args) => {
                        const filename = path.resolve('src', args.path.replace('?type=text', ''))
                        console.log(filename)
                        const source = await readFile(filename, 'utf8')
                        return {
                            contents: source,
                            errors: [],
                            loader: 'text'
                        }
                    })
                }
            }
        ]
    });
})()
