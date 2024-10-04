import { describe, test, expect } from 'vitest'
import { readSize } from '../plugins/imagePlugin'

describe('readSize', () => {
    test('empty', () => {
        expect(readSize()).toBeUndefined()
        expect(readSize('')).toBeUndefined()
        expect(readSize(null)).toBeUndefined()
    })
    test('not number', () => {
        expect(readSize('xxx')).toBeUndefined()
        expect(readSize('...djkad.')).toBeUndefined()
    })
    test('number', () => {
        expect(readSize('0xasd2x3')).toEqual({ width: 0, height: 2 })
        expect(readSize('100,')).toEqual({ width: 100, height: 100 })
        expect(readSize(',200')).toEqual({ width: 200, height: 200 })
        expect(readSize('300,200')).toEqual({ width: 300, height: 200 })
        expect(readSize('300, 200')).toEqual({ width: 300, height: 200 })
        expect(readSize('300 x 200')).toEqual({ width: 300, height: 200 })
        expect(readSize('300*200')).toEqual({ width: 300, height: 200 })
    })
})
