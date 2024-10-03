import Router from '@koa/router'
import { tsrUrlMdPage, mdPageIndexTS, buildMdPage } from './mdFile'
import { staticFile } from './nodeModules'

const router = new Router()
router
    .get(/\.md$/, buildMdPage)
    .get(/\/index\.ts$/, mdPageIndexTS)
    .get(/.+\.[a-zA-Z0-9]+$/, staticFile)
    .get(/^\/[^.]*$/, tsrUrlMdPage)

export default router
