import { describe, test } from 'vitest'
import path from 'path'
import fs from 'fs'
import moment from 'moment-timezone'
import { createMarkdownRender, defineConst, mdImgPath } from '../index'
import { wordCountAndTime } from '../../utils/word'

const md = createMarkdownRender()

describe('container', () => {
    const containerTxt = fs.readFileSync(path.resolve(__dirname, 'md/container.md'), 'utf-8')
    test('md', () => {
        // 读取到 markdown，开始渲染内容之前，把md的部份内容读取出来，作为参数传递
        // ------ 头部格式化的东西
        // ------ 标题、描述等
        // 文章整体的字数
        const env = {sourcePath: '', frontmatter: {
            title: '',
            other: '...',
            banner: ''
        }}
        const res = md.render(containerTxt, env)
        console.log(wordCountAndTime(res))
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
        console.log(moment(stat.mtimeMs).format())
        console.log(moment(stat.mtimeMs).format('YYYY-MM-DDTHH:mm:ss.SSSZ'))
    })
    /* test('![](imgpath)', () => {
        const regex = /!\[\]\((.*?)\s*(".*?")?\)/
        const str = '![](xxx.png)'
        const str1 = '![](xxx.png "xxx") asd'
        console.log(regex.exec(str)![1])
        console.log(regex.exec(str1)![1])
    }) */
})