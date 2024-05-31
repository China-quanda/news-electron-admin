<script setup lang="ts">
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/setting'
const settingStore = useSettingStore()
const { themeColor,showThemeChoice } = storeToRefs(settingStore)

const change = (val) => {
  settingStore.setPageThemeColor(val)
}
onMounted(() => {
  settingStore.setPageThemeColor(themeColor.value)
})
</script>

<template v-if="showThemeChoice">
  <span style="margin: 0px 5px"
    ><el-color-picker v-model="themeColor" size="small" @active-change="change"
  /></span>
</template>
