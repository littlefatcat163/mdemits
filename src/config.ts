import { loadConfigFromFile, normalizePath } from 'vite'
import type { SizeConfig } from './types'
import path from 'path'

export const sizeConfig: SizeConfig = {
    root: '',
    name: '',
    language: 'zh-CN',
    dateFormat: 'LLLL',
}

export async function resolveConfig(
    root: string,
    command: 'serve' | 'build',
    mode: string
) {
    try {
        const radixConfig = await loadConfigFromFile(
            { command, mode },
            normalizePath(path.resolve(process.cwd(), 'config.ts'))
        )
        Object.assign(sizeConfig, radixConfig?.config, {
            root: normalizePath(path.resolve(process.cwd())),
        })
    } catch (error) {}

    try {
        const rootConfig = await loadConfigFromFile(
            { command, mode },
            normalizePath(path.resolve(root, 'config.ts'))
        )
        Object.assign(sizeConfig, rootConfig?.config, {
            root: normalizePath(path.resolve(root)),
        })
    } catch (error) {}

    return sizeConfig
}
