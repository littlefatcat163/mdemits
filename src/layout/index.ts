import { createApp } from 'vue'

import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'
import App from './MDApp.vue'

const app = createApp(App)
app.use(PrimeVue, {
    theme: {
        preset: Lara,
        options: {
            darkModeSelector: '.p-dark'
        }
    }
 });
app.mount('#app')

import './index.css'

/* import nprogress from 'nprogress'
nprogress.done() */