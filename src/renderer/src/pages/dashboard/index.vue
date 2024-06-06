<template>
  <div>
    <h1>{{ $t('common.inputText') }}</h1>
    <button type="button" @click="setLanguage('zh')">zh</button>
    <button type="button" @click="setLanguage('en')">en</button>
    <time-card></time-card>
    <about-card></about-card>
    <progress-card></progress-card>
    <version-card></version-card>
    <welcome-card></welcome-card>
  </div>
</template>

<script setup lang="ts">
import TimeCard from './time.vue'
import AboutCard from './about.vue'
import ProgressCard from './progress.vue'
import VersionCard from './version.vue'
import WelcomeCard from './welcome.vue'
// import { setLanguage, t } from '@/plugins/vue-i18n'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
console.log(t('message.hello'))
import { useSettingStore } from '@/store/setting'
const setting = useSettingStore()

const setLanguage = (lang) => {
  console.log(11)
  locale.value = lang
  setting.locale = lang
}
</script>

<style scoped lang="scss"></style>
