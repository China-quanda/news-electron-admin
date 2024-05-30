<script setup lang="ts">
import { useSettingStore } from '@/store/setting'
const useStore = useSettingStore()
</script>

<template>
  <div class="main">
    <el-scrollbar>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" v-if="useStore.refsh" />
        </transition>
      </router-view>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
.main {
  margin: 0.5px;
  min-height: calc(100vh - 70px - 45px);
  // background-color: var(--el-bg-color);
}
.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.3s;
}
.fade-enter-to {
  opacity: 1;
}
</style>
