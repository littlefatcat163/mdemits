import minimist from 'minimist'
import chalk from 'chalk'
import { resolveConfig, createServer } from '.'
import { version, name } from '../package.json'

const argv: any = minimist(process.argv.slice(2))

const logReady = () => {
    console.info(`${name} is ready to go.`)
}

const logVersion = (runTime: number) => {
    console.info(
        `${chalk.green(`${chalk.bold(name)} v${version}`)} ${chalk.grey(
            'ready in'
        )} ${runTime} ms`
    )
}

const command = argv._[0]
const root = argv._[command ? 1 : 0] || process.cwd()
if (root) {
    argv.root = root
}

if (!command || command === 'dev') {
    if (argv.force) {
        delete argv.force
        argv.optimizeDeps = { force: true }
    }

    logReady()
    const startTime = Date.now()

    const createDevServer = async () => {
        await resolveConfig(root, 'serve', 'development')
        const port = 5194
        const server = await createServer({ port })
        // console.clear()
        logVersion(Date.now() - startTime)
        server.printUrls()
    }

    createDevServer().catch((err) => {
        console.error(
            `${chalk.red(`failed to start server. error:`)}\n${err.message}\n${
                err.stack
            }`
        )
        process.exit(1)
    })
} else {
    console.error(chalk.red(`unknown command "${command}".`))
    process.exit(1)
}
