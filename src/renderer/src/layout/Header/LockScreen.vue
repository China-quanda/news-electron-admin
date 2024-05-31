<script setup lang="ts">
import { useSettingStore } from '@/store/setting'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const useStore = useSettingStore()
const btn = () => {
  useStore.updateLockScreen(true)
  router.push({ path: '/lockScreen', query: { redirect: route.path } })
}
</script>

<template>
  <span v-if="useStore.isLockScreen" @click="btn" style="cursor: pointer; margin: 0px 5px">
    <my-icon icon="icon-suoding" size="26" />
  </span>
</template>
