import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { message } from 'ant-design-vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

message.config({
    top: '5rem'
})

app.mount('#app')
