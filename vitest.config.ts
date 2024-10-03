import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/markdown/**/*.{test,spec}.?(c|m)[jt]s?(x)']
  },
})