<script setup lang="ts">

import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/setting'
const useStore = useSettingStore()
const { dark, showModeSwitch } = storeToRefs(useStore)
const change = () => {
  useStore.setPageDark(dark.value)
}
onMounted(() => {
  change()
})
</script>

<template v-if="showModeSwitch">
  <el-switch
    style="margin: 0px 5px"
    v-model="dark"
    inline-prompt
    size="small"
    @change="change"
  />
</template>

<style lang="scss" scope>
.el-switch--small {
  // line-height: var(--news-layout-header-height);
  // height: var(--news-layout-header-height);
}
</style>
