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
  <span style="cursor: pointer" @click="btn">
    {{ collapse ? '展开' : '收起' }}
    <!-- <my-icon
      :icon="collapse ? 'icon-zhankaicaidan' : 'icon-shouqicaidan'"
      size="20"
      color="#8f8f8f"
    /> -->
  </span>
</template>
