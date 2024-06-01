<template>
  <div class="layout">
    <div class="layout-left">
      <Sidebar></Sidebar>
    </div>
    <div class="layout-right">
      <div class="layout-right-header"><Header /></div>
      <div class="layout-right-main"><Main /></div>
      <div class="layout-right-footer">Footer</div>
    </div>
  </div>
</template>

<script setup lang="ts" name="Layout">
import Sidebar from './Sidebar/index.vue'
import Main from './Main/index.vue'
import Header from './Header/index.vue'
</script>

<style scoped lang="scss">
.layout {
  display: flex;
  width: 100%;
  min-height: 100vh;
  max-height: 100vh;
  .layout-left {
    // width: 230px;
    flex-shrink: 0;
    // background-color: #f5f5f5;
    // background-color: beige;
  }
  .layout-right {
    flex: 1;
    display: flex;
    flex-direction: column;
    // background-color: rgb(29, 110, 164);
    &-header {
      height: var(--news-layout-header-height);
      // background-color: rgb(38, 155, 234);
    }
    &-main {
      flex: 1;
      // background-color: rgb(23, 112, 171);
    }
    &-footer {
      height: var(--news-layout-footer-height);
      line-height: var(--news-layout-footer-height);
      color: var(--el-text-color-primary);
      font-size: 12px;
      text-align: center;
      // background-color: rgb(7, 50, 79);
      background-color: var(--el-bg-color);
    }
  }
}
</style>
