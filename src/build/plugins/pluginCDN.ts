import esbuild from 'esbuild'

interface CNDMap {
    [key: string]: string
}

export default function pluginCDN(cdnMap: CNDMap): esbuild.Plugin {
    return {
        name: 'esbuild-plugin-cdn',
        setup(build) {
            build.onResolve({ filter: /.*/ }, (args) => {
                if (cdnMap[args.path]) {
                    return {
                        path: cdnMap[args.path],
                        external: true
                    }
                }
            })
        }
    }
}
