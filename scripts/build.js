import esbuild from 'esbuild'
import { clean } from 'esbuild-plugin-clean'
import { readFile } from 'fs/promises'
import path from 'path'

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
            // '.node': 'file',
            // '.ts': 'ts'
        },
        external: [
            ...Object.keys(pkg.dependencies),
        ],
        plugins: [
            clean({
                patterns: ['./dist/*', './dist/assets/*.map.js']
            }),
        ]
    });
})()
