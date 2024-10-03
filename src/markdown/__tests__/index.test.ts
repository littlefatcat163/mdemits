import { describe, test } from 'vitest'
import path from 'path'
import fs from 'fs'
import { createMarkdownRender } from '../index'

const md = createMarkdownRender()

describe('image', () => {
    const imageTxt = fs.readFileSync(path.resolve(__dirname, 'md/image.md'), 'utf-8')
    test('md', () => {
        const res = md.render(imageTxt)
        console.log(res)
    })
})

/* describe('frontmatter', () => {
    const frontmatterTxt = fs.readFileSync(path.resolve(__dirname, 'md/formatter.md'), 'utf-8')
    test('md', async () => {
        const mdItRes = md.render(frontmatterTxt)
        const mdRes = await marked(frontmatterTxt, {async: true})
        // console.log(mdItRes)
        // console.log('..')
        // console.log(mdRes) 
    })
}) */