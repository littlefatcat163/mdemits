import Koa from 'koa'
import Router from 'koa-router'
import os from 'os'
import chalk from 'chalk'
import path from 'path'
import { normalizePath } from 'vite'
import { mdEmitsConfig } from './config'

function printUrls(port: number) {
    const interfaces = os.networkInterfaces()
    const addresses = []

    for (let interfaceName in interfaces) {
        for (let iface of interfaces[interfaceName]!) {
            if (iface.family === 'IPv4' && !iface.internal) {
                addresses.push(iface.address)
            }
        }
    }

    console.log(chalk.bold(`Server is running!`))
    console.log(`  ${chalk.bold(chalk.greenBright('➜'))}  Local:   ${chalk.cyan(`http://localhost:${port}/`)}`)

    if (addresses.length > 0) {
        addresses.forEach(address => {
            console.log(`  ${chalk.bold(chalk.greenBright('➜'))}  Network: ${chalk.cyan(`http://${address}:${port}/`)}`)
        });
    }
}

type ServerOptions = {
    port?: number
    hostname?: string
}

type ServerResult = {
    printUrls: () => void
}

function urlToMdFilePath(url: string) {
    if (/[\/]$/.test(url)) {
        return normalizePath(path.join(mdEmitsConfig.root, url, 'index.md'))
    } else {
        return normalizePath(path.join(mdEmitsConfig.root, url + '.md'))
    }
}

function createRouter() {
    const router = new Router()
    router.get(/^\/@node_modules\/.+$/, (ctx) => {
        ctx.status = 200
        ctx.body = 'ok there is node_modules'
    })
    router.get(/^\/[^.]*$/, async (ctx) => {
        const filePath1 = urlToMdFilePath(ctx.path)
        const filePath2 = urlToMdFilePath(ctx.url)
        ctx.body = filePath1 + '\n' + filePath2
    })
    return router
}

export function createServer({ port = 5194, hostname = '0.0.0.0' }: ServerOptions) {
    return new Promise<ServerResult>((resolve, reject) => {
        const app = new Koa()
        const router = createRouter()
        app.use(router.routes())
        app.use(router.allowedMethods())
        app.on('error', (err) => {
            reject(err)
            console.error(`${chalk.red('Server error:')} ${err}`)
        })
        const server = app.listen(port, hostname, () => {
            printUrls(port)
        })
        server.on('listening', () => {
            resolve({
                printUrls: () => printUrls(port)
            })
        })
        server.on('error', (err) => {
            reject(err)
        })
    })
}