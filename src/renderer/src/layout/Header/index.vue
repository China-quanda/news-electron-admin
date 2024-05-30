<script setup lang="ts">
import Fullscreen from './Fullscreen.vue'
import Collapse from './Collapse.vue'
// import refsh from '@/views/Layout/components/Header/refsh.vue'
// import breadcrumb from '@/views/Layout/components/Header/breadcrumb.vue'
// import modeSwitch from '@/views/Layout/components/Header/modeSwitch.vue'
// import themeChoice from '@/views/Layout/components/Header/themeChoice.vue'
// import lockScreen from '@/views/Layout/components/Header/lockScreen.vue'
</script>

<template>
  <div class="header">
    <div class="left">
      <Collapse class="collapse" />
      <!-- <breadcrumb class="breadcrumb" /> -->
    </div>
    <div class="right">
      <!-- <refsh /> -->
      <Fullscreen />
      <!-- <lockScreen /> -->
      <!-- <modeSwitch /> -->
      <!-- <themeChoice /> -->
    </div>
  </div>
</template>
<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  line-height: 70px;
  padding: 0px 10px;
  // background-color: var(--el-bg-color);
}
.left,
.right {
  display: flex;
}
.breadcrumb {
  margin-left: 10px;
}
</style>
