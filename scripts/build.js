import esbuild from 'esbuild'
import { clean } from 'esbuild-plugin-clean'
import copy from 'esbuild-plugin-copy-watch'
import { readFile } from 'fs/promises'
import path from 'path'
import pluginVue from 'esbuild-plugin-mdmits-vue'

(async () => {
    const res = await readFile(path.resolve('package.json'), 'utf-8');
    const pkg = JSON.parse(res);
    await esbuild.build({
        entryPoints: ['./src/index.ts', './src/cli.ts'],
        chunkNames: '[name]-[hash]',
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
            'ui'
        ],
        plugins: [
            clean({
                patterns: ['./dist/*', './dist/assets/*.map.js']
            }),
            copy({
                paths: [
                    { from: 'src/layout/styles/*', to: 'layout/styles' },
                    { from: 'src/layout/icons/*', to: 'layout/icons' },
                    { from: 'src/layout/ui/*', to: 'layout/ui' },
                    { from: 'src/layout/imgs/*', to: 'layout/imgs' },
                    { from: 'src/types/*', to: 'types' },
                    { from: ['src/layout/tmp_index.html', 'src/layout/tmp_index.ts', 'src/layout/tmp_app.vue'], to: 'layout' }
                ]
            }),
            pluginVue(),
            {
                name: 'ui',
                setup(build) {
                    build.onResolve({ filter: /.*/ }, (args) => {
                        if (args.path === 'ui') {
                            return {
                                path: './layout/ui/index.js',
                                external: true
                            }
                        }
                    })
                }
            },
            {
                name: 'only-text',
                setup(build) {
                    build.onResolve({filter: /\.*\?type=text/}, args => ({
                        path: args.path,
                        namespace: 'only-text'
                    }))
                    build.onLoad({filter: /\.*\?type=text/, namespace: 'only-text'}, async (args) => {
                        const filename = path.resolve('src', args.path.replace('?type=text', ''))
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
