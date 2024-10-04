import { describe, test } from 'vitest'
import path from 'path'
import fs from 'fs'
import { createMarkdownRender } from '../index'

const md = createMarkdownRender()

describe('image', () => {
    const imageTxt = fs.readFileSync(path.resolve(__dirname, 'md/image.md'), 'utf-8')
    test('md', () => {
        // const res = md.render(imageTxt, {resouce: 'xxx'})
        // console.log(res)
    })
})