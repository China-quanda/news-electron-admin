import type { App } from 'vue'
import { pinia } from './pinia'
import { setupElementPlus } from './element-plus'

export const initPlugins = (app: App<Element>) => {
  setupElementPlus(app)
  app.use(pinia)
}
