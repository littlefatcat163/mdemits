import type { RouterContext } from '@koa/router'
import { readFile } from 'fs/promises'
import { joinCwdPath } from '../handle'

function getResType(url: string) {
    if (/.css$/.test(url)) {
        return 'text/css; charset=utf-8'
    }
    return 'application/javascript; charset=utf-8'
}

function targetFilePath(url: string) {
    if (/\.[m]{0,1}js$|\.css$/.test(url)) {
        return url
    }
    return `${url}/index.mjs`
}

export async function nodeModulesFile(ctx: RouterContext) {
    const url = targetFilePath(ctx.path)
    const targetFile = await readFile(joinCwdPath(url), 'utf8')
    ctx.response.type = getResType(url)
    ctx.body = targetFile
}
