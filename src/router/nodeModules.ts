import type { RouterContext } from '@koa/router'
import { readFile } from 'fs/promises'
import { createReadStream } from 'fs'
import mime from 'mime-types'
import { joinCwdPath } from '../handle'

export async function nodeModulesFile(ctx: RouterContext) {
    const url = ctx.path
    const targetFile = await readFile(joinCwdPath(url), 'utf8')
    ctx.response.type = mime.contentType(url.split('.').pop()!) as string
    ctx.body = targetFile
}

const isMediaStreamType = (mimeType: string) => {
    const mediaTypes = ['audio/', 'video/', 'image/']
    return mediaTypes.some((type) => mimeType.startsWith(type))
}

export async function staticFile(ctx: RouterContext) {
    const url = ctx.path
    const mimeType = mime.contentType(url.split('.').pop()!) as string
    ctx.response.type = mimeType
    const resPath = joinCwdPath(url)
    if (isMediaStreamType(mimeType)) {
        ctx.body = createReadStream(resPath)
    } else {
        ctx.body = await readFile(resPath, 'utf8')
    }
}
