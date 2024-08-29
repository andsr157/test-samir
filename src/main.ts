import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAxiosPlugin } from './plugins/api'

import App from './App.vue'
import router from './router'

const { axiosInstance, axiosPlugin } = createAxiosPlugin('https://raw.githubusercontent.com/andreascandle/p2p_json_test/main/api')

const app = createApp(App)
const pinia = createPinia()

app.use(axiosPlugin)
app.use(pinia)
app.use(router)

pinia.use(({ store }) => {
    store.$axios = axiosInstance
})

app.mount('#app')
