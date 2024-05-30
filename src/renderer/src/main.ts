import './assets/main.css'
import router from '@renderer/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { initPlugins } from './plugins'

import { createApp } from 'vue'
import App from './App.vue'

// createApp(App).mount('#app')
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
initPlugins(app)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})
app.mount('#app')
