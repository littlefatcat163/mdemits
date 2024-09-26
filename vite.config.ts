import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/layout',
  plugins: [vue()],
  build: {
    cssCodeSplit: false,
    outDir: 'ui',
    lib: {
      entry: 'components/ui.ts',
      formats: ['es'],
      fileName: 'index',
      name: 'ui'
    },
    rollupOptions: {
      output: {
        format: 'esm'
      },
      external: ['vue']
    }
  }
})
