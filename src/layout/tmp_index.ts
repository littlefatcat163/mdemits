import { createSSRApp } from 'vue'
// import ElementPlus, { ZINDEX_INJECTION_KEY } from 'element-plus'
import Varlet from '@varlet/ui'
import App from './MDApp.vue'

const app = createSSRApp(App)
// app.use(ElementPlus, { size: 'large' })
// app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
app.use(Varlet)
app.mount('#app', true)
