import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.start()

import { createApp } from 'vue'
import 'primeicons/primeicons.css'
import buttonStyle from 'primevue/button/style'
import rippleStyle from 'primevue/ripple/style'
import toolbarStyle from 'primevue/toolbar/style'
import PrimeVue from 'primevue/config'
import Lara from '@primevue/themes/lara'
const app = createApp({})
app.use(PrimeVue, {
    theme: {
        // preset: Lara,
        options: {
            darkModeSelector: '.p-dark'
        }
    }
})
function loadComponentStyle(cmpStyle: any) {
    document.head.append(document.createRange().createContextualFragment(cmpStyle.getThemeStyleSheet()))
}
/* loadComponentStyle(buttonStyle)
loadComponentStyle(rippleStyle)
loadComponentStyle(toolbarStyle) */

import './index.css'

// document.head.append(ButtonStyle.getThemeStyleSheet())
// document.head.append(document.createTextNode(ButtonStyle.getThemeStyleSheet()))
// console.log(new DOMParser().parseFromString(ButtonStyle.getThemeStyleSheet(), 'text/html'))

// console.log(ButtonStyle.getThemeStyleSheet())
// console.log(ButtonStyle.loadTheme())
// app.mount('#app')

