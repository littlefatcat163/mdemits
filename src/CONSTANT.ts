// @ts-nocheck
import layoutVueTmplate from './layout/MdApp.vue?type=text'
import indexHtml from './layout/index.html?type=text'
import indexTs from './layout/index.ts?type=text'

export const LAYOUT_VUE_TEMPLATE = layoutVueTmplate as string
export const INDEX_HTML = (indexHtml as string).replace(
    './index.ts',
    '/index.ts'
)

// export const INDEX_JS: string = indexJs
export const INDEX_TS = (indexTs as string)
    .replace(`from 'vue'`, `from '/@node_modules/vue'`)
    .replace(`from 'ant-design-vue'`, `from '/@node_modules/ant-design-vue'`)
    .replace(`from 'ant-design-vue/dist/reset.css'`, `from '/@node_modules/ant-design-vue/dist/reset.css'`)
