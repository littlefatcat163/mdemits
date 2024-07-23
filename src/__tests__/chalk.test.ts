import { describe, test, expect } from 'vitest'
import chalk from 'chalk'

describe('chalk', () => {
    test('console version', () => {
        console.info(
            `${chalk.green(`${chalk.bold('MDEmits')} v${'1.0.0'}`)}  ${chalk.grey('ready in')} 191 ms`
        )
        console.info(chalk.bold(`Server is running!`))
        console.info(`  ${chalk.bold(chalk.greenBright('➜'))}  Local:   ${chalk.cyan(`http://localhost:5194/`)}`);
    })
})