import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import '@unocss/reset/tailwind.css'

import 'virtual:uno.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
// eslint-disable-next-line no-console
console.log('main.ts')
