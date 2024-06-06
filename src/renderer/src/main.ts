import './assets/main.css'
import router from '@renderer/router'
import { initPlugins } from './plugins'
import errorHandler from '@/utils/errorHandler'
//导入自定义全局组件
import gloalComponents from '@/gloalComponents'

import { createApp } from 'vue'
import App from './App.vue'

// createApp(App).mount('#app')
const app = createApp(App)
//全局代码错误捕捉
app.config.errorHandler = errorHandler

initPlugins(app)
app.use(gloalComponents)
app.use(router)
app.mount('#app')
