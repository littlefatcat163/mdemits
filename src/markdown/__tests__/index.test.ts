import { describe, test } from 'vitest'
import path from 'path'
import fs from 'fs'
import moment from 'moment-timezone';
import { createMarkdownRender } from '../index'

const md = createMarkdownRender()

describe('container', () => {
    const containerTxt = fs.readFileSync(path.resolve(__dirname, 'md/container.md'), 'utf-8')
    test('md', () => {
        const res = md.render(containerTxt)
        console.log(res)
    })
})

describe('dayjs', () => {
    test('LLLL', () => {
        console.log(moment().locale('zh-CN').format('LLLL'))
        console.log(moment().locale('en').format('LLLL'))
    })
    test('file date', () => {
        const stat = fs.statSync(path.resolve(__dirname, 'md/container.md'))
        console.log(`创建日期: ${moment(stat.birthtimeMs).locale('zh-cn').format('LLLL')}`)
        console.log(`修改日期: ${moment(stat.mtimeMs).locale('zh-cn').format('LLLL')}`)
    })
})