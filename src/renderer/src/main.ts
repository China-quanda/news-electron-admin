import './assets/main.css'
import router from '@renderer/router'
import { initPlugins } from './plugins'

import { createApp } from 'vue'
import App from './App.vue'

// createApp(App).mount('#app')
const app = createApp(App)
initPlugins(app)
app.use(router)
app.mount('#app')
