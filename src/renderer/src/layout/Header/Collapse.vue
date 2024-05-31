<script setup lang="ts">
// import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '@/store/setting'
// import { local} from '@/utils/storage'
const useStore = useSettingStore()
const { collapse } = storeToRefs(useStore)
const btn = () => {
  collapse.value = !collapse.value
  // local.set('collapse',collapse.value)
}
</script>

<template>
  <el-icon  style="cursor: pointer;width: 30px;" @click="btn">
    <Expand v-if="collapse" />
    <Fold v-else />
  </el-icon>
</template>
