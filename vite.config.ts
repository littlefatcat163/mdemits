import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vitePluginSvg from './src/vitePlugin/vite-plugin-svg'

// https://vitejs.dev/config/
export default defineConfig({
  root: 'src/layout',
  plugins: [vue(), vitePluginSvg('src/layout/icons')],
  build: {
    cssCodeSplit: false,
    outDir: 'ui',
    minify: true,
    lib: {
      entry: ['components/index.ts'],
      formats: ['es'],
      // fileName: 'index',
      name: 'ui'
    },
    rollupOptions: {
      output: {
        format: 'esm'
      },
      external: ['vue', 'photoswipe', 'photoswipe/lightbox']
    }
  }
})
