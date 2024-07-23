import Koa from 'koa'
import os from 'os'
import chalk from 'chalk'
import { mdEmitsConfig } from './config'

function printUrls(port: number) {
    const interfaces = os.networkInterfaces();
    const addresses = [];

    for (let interfaceName in interfaces) {
        for (let iface of interfaces[interfaceName]!) {
            if (iface.family === 'IPv4' && !iface.internal) {
                addresses.push(iface.address);
            }
        }
    }

    console.log(chalk.bold(`Server is running!`));
    console.log(`  ${chalk.bold(chalk.greenBright('➜'))}  Local:   ${chalk.cyan(`http://localhost:${port}/`)}`);

    if (addresses.length > 0) {
        addresses.forEach(address => {
            console.log(`  ${chalk.bold(chalk.greenBright('➜'))}  Network: ${chalk.cyan(`http://${address}:${port}/`)}`);
        });
    }
}

type ServerOptions = {
    port?: number;
    hostname?: string;
}

type ServerResult = {
    printUrls: () => void;
}

export function createServer({ port = 5194, hostname = '0.0.0.0' }: ServerOptions) {
    return new Promise<ServerResult>((resolve, reject) => {
        const app = new Koa();
        app.use(async (ctx, next) => {
            console.log(mdEmitsConfig)
            ctx.status = 200
            ctx.body = 'hello mdemits!'
        });
        app.on('error', (err) => {
            reject(err);
            console.error(`${chalk.red('Server error:')} ${err}`);
        });
        const server = app.listen(port, hostname, () => {
            printUrls(port);
        });
        server.on('listening', () => {
            resolve({
                printUrls: () => printUrls(port)
            });
        });
        server.on('error', (err) => {
            reject(err);
        });
    })
}