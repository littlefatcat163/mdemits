import { describe, test, expect } from 'vitest'
import path from 'path'
import { readdirSync } from 'fs'

describe('path', () => {
    test('join', () => {
        expect(path.join('/git/flow', 'index.ts')).toEqual('/git/flow/index.ts')
        expect(path.join('/git/flow/', 'index.ts')).toEqual('/git/flow/index.ts')
    })
    test('dir', () => {
        const a = readdirSync(path.join('node_modules'))
        console.log('....', a)
    })
})