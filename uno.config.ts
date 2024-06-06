// uno.config.ts
import {
  defineConfig,
  presetUno,
  presetIcons,
  transformerVariantGroup,
  transformerDirectives
} from 'unocss'

export default defineConfig({
  // ...UnoCSS options
  presets: [presetUno(), presetIcons()],
  transformers: [transformerVariantGroup(), transformerDirectives()]
})
