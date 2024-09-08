import Router from '@koa/router'
import { tsrUrlMdPage, mdPageIndexTS, buildMdPage } from './mdFile'
import { nodeModulesFile } from './nodeModules'

const router = new Router()
router
    .get(/^\/node_modules\/.+$/, nodeModulesFile)
    .get(/\.md$/, buildMdPage)
    .get(/\/index\.ts$/, mdPageIndexTS)
    .get(/^\/[^.]*$/, tsrUrlMdPage)

export default router
