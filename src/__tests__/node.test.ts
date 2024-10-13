import { describe, test, expect } from 'vitest'
import path from 'path'

describe('path', () => {
    test('join', () => {
        expect(path.join('/git/flow', 'index.ts')).toEqual('/git/flow/index.ts')
        expect(path.join('/git/flow/', 'index.ts')).toEqual('/git/flow/index.ts')
    })
})