<script setup lang="ts">
import { nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/setting'
const settingStore = useSettingStore()
const { refsh } = storeToRefs(settingStore)
const btn = () => {
  refsh.value = !refsh.value
  nextTick(() => {
    refsh.value = !refsh.value
  })
}
</script>

<template>
  <el-icon  style="cursor: pointer;width: 30px;" @click="btn">
    <Refresh />
  </el-icon>
</template>
