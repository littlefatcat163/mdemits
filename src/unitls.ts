import { normalizePath } from 'vite'
import path from 'path'

export function joinCwdPath(...paths: string[]): string {
    return normalizePath(path.join(process.cwd(), ...paths))
}

export function joinMdemitsDistPath(...paths: string[]): string {
    return joinCwdPath('node_modules', 'mdemits', 'dist', ...paths)
}