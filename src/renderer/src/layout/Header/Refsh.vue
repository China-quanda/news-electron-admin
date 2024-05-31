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
  <span @click="btn" style="cursor: pointer; margin: 0px 5px">
    <my-icon icon="icon-shuaxin-line" size="20" />
  </span>
</template>
