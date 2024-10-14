let runEnv: {
    isBrowser: boolean
} | null = null

function detectRunEnv() {
    if (runEnv) {
        return runEnv
    }
    const isBrowser =
        typeof window === 'object' && typeof window.document === 'object'
    runEnv = {
        isBrowser,
    }
    return runEnv
}

export const isBrowser = detectRunEnv().isBrowser
