import { existsSync } from 'fs'
import { isEmpty } from 'lodash-es'
import { joinCwdPath } from './unitls'

function getModulePath(name: string) {
    const pathPrefixs = ['node_modules/.pnpm/node_modules', 'node_modules']
    return (
        pathPrefixs.find((pathItem) =>
            existsSync(joinCwdPath(pathItem, name))
        )! + `/${name}`
    )
}

type ImportMapItem = {
    name: string
    deep: boolean
}

function primevueEsm() {
    const registries = ['primevue', '@primeuix', '@primevue']
    while (!isEmpty(registries)) {
        const modulePath = getModulePath(registries.shift()!)
        
    }
}

function resolveImp() {
    const imports: ImportMapItem[] = [
        {
            name: 'vue',
            deep: false,
        },
        {
            name: 'primevue',
            deep: true,
        },
    ]
    const importMap: Record<string, string> = {
        vue: '/node_modules/vue/dist/vue.esm-browser.js',
        primevue: '',
    }
    // const pathPrefix = getPathPrefix();
    imports.forEach(({ name, deep }) => {})
}
