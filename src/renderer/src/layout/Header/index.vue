<script setup lang="ts">
import Fullscreen from './Fullscreen.vue'
import Collapse from './Collapse.vue'
import Refsh from './Refsh.vue'
import Breadcrumb from './Breadcrumb.vue'
import ModeSwitch from './ModeSwitch.vue'
import ThemeChoice from './ThemeChoice.vue'
import LockScreen from './LockScreen.vue'
</script>

<template>
  <div class="header">
    <div class="left">
      <Collapse class="collapse" />
      <Breadcrumb class="breadcrumb" />
    </div>
    <div class="right">
      <Refsh />
      <Fullscreen />
      <LockScreen />
      <ModeSwitch />
      <ThemeChoice />
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
  background-color: var(--el-bg-color);
}
.left,
.right {
  display: flex;
}
.breadcrumb {
  margin-left: 10px;
}
</style>
