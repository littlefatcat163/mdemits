import { describe, expect, test } from 'vitest'
import { wordCountAndTime } from '../utils/word'

describe('wordCountAndTime', () => {
    test('en', () => {
        expect(wordCountAndTime(`<p>I'm test.</p>`)).toEqual({ wordCount: 3, minutes: 1 })
        expect(wordCountAndTime(`<p>I'm test.</p>asd 22iiiii xasd`)).toEqual({ wordCount: 5, minutes: 1 })
        expect(wordCountAndTime(`<p></p>`)).toEqual({ wordCount: 0, minutes: 0 })
    })
    test('zh', () => {
        expect(wordCountAndTime('中文 词语')).toEqual({ wordCount: 4, minutes: 1 })
    })
})