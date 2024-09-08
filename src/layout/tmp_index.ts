import { createSSRApp } from 'vue'
// import ElementPlus, { ZINDEX_INJECTION_KEY } from 'element-plus'
// import Varlet from '@varlet/ui'
import Button from 'primevue/button'
import PrimeVue from 'primevue/config'
import App from './MDApp.vue'

const app = createSSRApp(App)
// app.use(ElementPlus, { size: 'large' })
// app.provide(ZINDEX_INJECTION_KEY, { current: 0 })
// app.use(Varlet)
app.component('Button', Button)
app.use(PrimeVue, {
    theme: {
        options: {
            darkModeSelector: '.p-dark'
        }
    }
});
app.mount('#app', true)
