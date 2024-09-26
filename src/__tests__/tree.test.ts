import { describe, expect, test } from 'vitest'
import { treeNodeRegisterId } from '../utils/tree'
import type { TreeItem } from '../types'

describe('treeNodeRegisterId', () => {
    test('id', () => {
        const data: TreeItem[] = [
            {
                text: '0',
            },
            {
                text: '1',
                items: [
                    {
                        text: '1-0',
                    },
                    {
                        text: '1-1',
                    },
                ],
            },
            {
                text: '2',
                items: [
                    {
                        text: '2-0',
                        items: [{ text: '2-0-0' }, { text: '2-0-1' }],
                    },
                    {
                        text: '2-1',
                        items: [{ text: '2-1-0' }, { text: '2-1-1' }],
                    },
                ],
            },
        ]
        const result = treeNodeRegisterId(data)
        expect(result).toEqual([
            {
                id: '0',
                text: '0'
            },
            {
                id: '1',
                text: '1',
                items: [
                    {
                        id: '1-0',
                        text: '1-0',
                    },
                    {
                        id: '1-1',
                        text: '1-1',
                    },
                ],
            },
            {
                id: '2',
                text: '2',
                items: [
                    {
                        id: '2-0',
                        text: '2-0',
                        items: [{ id: '2-0-0', text: '2-0-0' }, { id: '2-0-1', text: '2-0-1' }],
                    },
                    {
                        id: '2-1',
                        text: '2-1',
                        items: [{ id: '2-1-0', text: '2-1-0' }, { id: '2-1-1', text: '2-1-1' }],
                    },
                ],
            },
        ])
    })
})
