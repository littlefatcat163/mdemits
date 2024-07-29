import { normalizePath } from 'vite'
import path from 'path'

export function joinCwdPath(...paths: string[]): string {
    return normalizePath(path.join(process.cwd(), ...paths))
}