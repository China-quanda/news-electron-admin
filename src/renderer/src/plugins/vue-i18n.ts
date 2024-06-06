import { createI18n } from 'vue-i18n'
import { createPinia } from 'pinia'
import { useSettingStore } from '@/store/setting'
const settingStore = useSettingStore(createPinia())
import zh_cn from '@/locales/zh-CN'
import en from '@/locales/en'
// 导入 element-plus 全局配置国际化的配置
import el_zh_cn from 'element-plus/es/locale/lang/zh-cn'
import el_en from 'element-plus/es/locale/lang/en'

const messages = {
  zh: {
    ...zh_cn,
    ...el_zh_cn
  },
  en: {
    ...en,
    ...el_en
  }
}

// export const setLanguage = (lang: 'zh' | 'en') => {
//   locale.value = lang
//   settingStore.locale = lang
// }

// export const tlan = (key: string | number) => t(key)

export const i18n = createI18n({
  locale: settingStore.locale,
  legacy: false, // you must specify 'legacy: false' option
  fallbackLocale: settingStore.locale,
  messages
})
