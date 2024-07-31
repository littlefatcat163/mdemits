import { createSSRApp } from 'vue'
import { Layout } from 'ant-design-vue'
// import 'ant-design-vue/dist/reset.css'
import App from './MDApp.vue'

const app = createSSRApp(App)
app.use(Layout)
app.mount('#test')