import type { App } from 'vue'
import { pinia } from './pinia'
import { setupElementPlus } from './element-plus'

export const initPlugins = (app: App<Element>) => {
  app.use(pinia)
  setupElementPlus(app)
}
