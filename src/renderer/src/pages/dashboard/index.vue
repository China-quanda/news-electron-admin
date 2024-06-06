<template>
  <div>
    <h1>{{ $t('message.hello') }}</h1>
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
import { createI18n, useI18n } from 'vue-i18n'
const { t } = useI18n()
console.log(t('message.hello'))
</script>

<style scoped lang="scss"></style>
