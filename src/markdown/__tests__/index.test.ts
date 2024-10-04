import { describe, test } from 'vitest'
import path from 'path'
import fs from 'fs'
import { createMarkdownRender } from '../index'

const md = createMarkdownRender()

describe('image', () => {
    const containerTxt = fs.readFileSync(path.resolve(__dirname, 'md/container.md'), 'utf-8')
    test('md', () => {
        const res = md.render(containerTxt)
        console.log(res)
    })
})