import { loadConfigFromFile, normalizePath } from 'vite'
import path from 'path'

export const mdEmitsConfig = {
    ok: true,
    root: ''
}

export async function resolveConfig(root: string, command: 'serve' | 'build', mode: string) {
    try {
        const radixConfig = await loadConfigFromFile({command, mode}, normalizePath(path.resolve(process.cwd(), 'config.ts')));
        Object.assign(mdEmitsConfig, radixConfig?.config, { root: normalizePath(path.resolve(process.cwd())) });
    } catch (error) {
        
    }
    
    try {
        const rootConfig = await loadConfigFromFile({command, mode}, normalizePath(path.resolve(root, 'config.ts')));
        Object.assign(mdEmitsConfig, rootConfig?.config, { root: normalizePath(path.resolve(root)) });
    } catch (error) {
        
    }
    
    return mdEmitsConfig;
}