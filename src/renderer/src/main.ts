import './assets/main.css'
import router from '@renderer/router'
import { createApp } from 'vue'
import App from './App.vue'

// createApp(App).mount('#app')
const app = createApp(App)
app.use(router)
app.mount('#app')
