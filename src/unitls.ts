import { normalizePath } from 'vite'
import type { App, Plugin } from 'vue'
import path from 'path'
import { readFile } from 'fs/promises'

export function joinCwdPath(...paths: string[]): string {
    return normalizePath(path.join(process.cwd(), ...paths))
}

export function joinMdemitsDistPath(...paths: string[]): string {
    return joinCwdPath('node_modules', 'mdemits', 'dist', ...paths)
}

let INDEX_HTML: string
let INDEX_TS: string
let LAYOUT_VUE_TEMPLATE: string
export async function htmlTemplate() {
    if (!!INDEX_TS) {
        return {
            INDEX_HTML,
            INDEX_TS,
            LAYOUT_VUE_TEMPLATE,
        }
    }
    INDEX_HTML = await readFile(
        joinMdemitsDistPath('layout', 'tmp_index.html'),
        'utf-8'
    )
    INDEX_TS = await readFile(
        joinMdemitsDistPath('layout', 'tmp_index.ts'),
        'utf-8'
    )
    LAYOUT_VUE_TEMPLATE = await readFile(
        joinMdemitsDistPath('layout', 'MdApp.vue'),
        'utf-8'
    )
    return {
        INDEX_HTML,
        INDEX_TS,
        LAYOUT_VUE_TEMPLATE,
    }
}

export function withInstall<T>(component: T): T & Plugin {
    const Component = component as any & Plugin
    Component.install = (app: App) => {
        app.component(Component.name, Component)
    }
    return Component
}
