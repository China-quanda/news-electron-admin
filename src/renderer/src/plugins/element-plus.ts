import type { App } from 'vue'
// 导入 element-plus
import ElementPlus from 'element-plus'
// 导入 element-plus 样式
import 'element-plus/dist/index.css'
// 导入 element-plus 图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 导入 element-plus 暗黑模式
import 'element-plus/theme-chalk/dark/css-vars.css'
// 导入 element-plus 全局配置国际化的配置
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// 导入 dayjs 全局配置国际化的配置
import 'dayjs/locale/zh-cn'

export const setupElementPlus = (app: App<Element>) => {
  app.use(ElementPlus, {
    locale: zhCn
  })
  // 注册全部图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

