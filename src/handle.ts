import { normalizePath } from 'vite'
import path from 'path'
import { readFile, stat } from 'fs/promises'
import moment from 'moment-timezone'
import { sizeConfig } from './config'
import { scanSvg, svgsHTML } from './vitePlugin/vite-plugin-svg'

export function joinCwdPath(...paths: string[]): string {
    return normalizePath(path.join(process.cwd(), ...paths))
}

export function joinMdemitsDistPath(...paths: string[]): string {
    return joinCwdPath('node_modules', 'mdemits', 'dist', ...paths)
}

export function nodeModuleMdemitsDist(...paths: string[]) {
    return path.join('/', 'node_modules', 'mdemits', 'dist', ...paths)
}

export function joinSuPath(...paths: string[]) {
    return path.join(...paths.map((item) => item.replace(/^\.\//, '../')))
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
    INDEX_HTML = (
        await readFile(joinMdemitsDistPath('layout', 'tmp_index.html'), 'utf-8')
    ).replace(
        '<!-- svg-defs -->',
        svgsHTML(scanSvg(joinMdemitsDistPath('layout/icons')))
    )
    INDEX_TS = await readFile(
        joinMdemitsDistPath('layout', 'tmp_index.ts'),
        'utf-8'
    )
    LAYOUT_VUE_TEMPLATE = await readFile(
        joinMdemitsDistPath('layout', 'tmp_app.vue'),
        'utf-8'
    )
    return {
        INDEX_HTML,
        INDEX_TS,
        LAYOUT_VUE_TEMPLATE,
    }
}

export async function fileDate(filePath: string) {
    let dateTime = '-'
    let birthTime = '-'
    let mTime = '-'
    try {
        const { birthtimeMs, mtimeMs } = await stat(filePath)
        dateTime = moment(birthtimeMs).format()
        birthTime = moment(birthtimeMs)
            .locale(sizeConfig.language!)
            .format(sizeConfig.dateFormat)
        mTime = moment(mtimeMs)
            .locale(sizeConfig.language!)
            .format(sizeConfig.dateFormat)
    } catch (error) {}
    return {
        dateTime,
        birthTime,
        mTime,
    }
}
