import { load } from 'cheerio'

const parseWords = (data: string) => {
    const words =
        data.match(
            /[\w|\d|\s|,|.|\u00C0-\u024F|\u4E00-\u9FA5|\u3041-\u309F]+/giu
        ) ?? []
    return words.flatMap((word) => word.match(/[\u4E00-\u9FA5]/gu) ?? word)
}

const getNumberOfWords = (data: string) =>
    parseWords(data).reduce(
        (accumulator, word) =>
            accumulator +
            (!word.trim().length ? 0 : word.trim().split(/\s+/u).length),
        0
    )

const wordCountFormat = (wordCount: number) => {
    if (wordCount > 9999) {
        return Math.round(wordCount / 1000) + 'k'
    }
    if (wordCount > 999) {
        return Math.round(wordCount / 100) / 10 + 'k'
    }
    return wordCount.toString()
}

export const wordCountAndTime = (textContent: string, wordsPerMinute = 200) => {
    const text = load(textContent).text().trim()
    const wordCount = getNumberOfWords(text)
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return {
        wordCount,
        minutes,
        words: wordCountFormat(wordCount),
    }
}
