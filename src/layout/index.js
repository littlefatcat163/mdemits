import { createSSRApp } from 'vue'
import { Layout } from 'ant-design-vue'
import App from './App.vue'


const app = createSSRApp(App)
app.use(Layout)
app.mount('#app')