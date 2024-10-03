import { createApp } from 'vue'

import './styles/bootstrap.css'
import './styles/index.css'
import 'photoswipe/photoswipe.css'
import App from './MDApp.vue'

const app = createApp(App)
app.mount('#app')

/* import nprogress from 'nprogress'
nprogress.done() */