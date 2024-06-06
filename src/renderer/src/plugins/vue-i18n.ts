import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
  // something vue-i18n options here ...
  locale: 'en',
  legacy: false, // you must specify 'legacy: false' option
  fallbackLocale: 'en',
  messages: {
    en: {
      message: {
        hello: 'hello world'
      }
    },
    ja: {
      message: {
        hello: 'こんにちは、世界'
      }
    }
  }
})
