import { createSSRApp } from 'vue'
import App from './tmp_app.vue'

const app = createSSRApp(App)
app.mount('#app', true)
