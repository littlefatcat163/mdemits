import { createSSRApp, createApp } from 'vue'
import { Layout, Button } from 'ant-design-vue'
// import 'ant-design-vue/dist/reset.css'
import App from './MDApp.vue'

const app = createSSRApp(App)
app.use(Layout).use(Button)
app.mount('#app', true)