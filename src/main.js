import { createApp } from 'vue'
import App from './App.vue'
import router from './backends/router/router'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'

const app = createApp(App)
app.use(router)
app.mount('#app')
