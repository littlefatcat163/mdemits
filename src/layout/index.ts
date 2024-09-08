import { createApp } from 'vue'
// import ElementPlus, { ZINDEX_INJECTION_KEY } from 'element-plus'
// import 'element-plus/dist/index.css'
// import Varlet from '@varlet/ui'
// import './index.css'
import Button from 'primevue/button'
import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'
import App from './MDApp.vue'

const app = createApp(App)
// app.use(ElementPlus, { size: 'large' })
// app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
// app.use(Varlet)
app.component('Button', Button)
app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Lara,
        options: {
            darkModeSelector: '.p-dark'
        }
    }
 });
app.mount('#app')
