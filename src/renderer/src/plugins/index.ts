import type { App } from 'vue'
import { pinia } from '@store'

export const initPlugins = (app: App<Element>) => {
  app.use(pinia)
}
