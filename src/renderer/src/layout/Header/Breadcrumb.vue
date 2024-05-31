<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useSettingStore } from '@/store/setting'
let route = useRoute()
let { breadcrumbSeparator, showBreadcrumbIcon } = useSettingStore()
</script>

<template>
  <el-breadcrumb :separator="breadcrumbSeparator">
    <el-breadcrumb-item
      v-for="item in route.matched"
      :key="item.path"
      v-show="item.name"
      :to="item.path"
    >
      <!-- <my-icon v-if="showBreadcrumbIcon" :icon="item.meta.icon" /> -->
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.el-breadcrumb {
  // line-height: var(--news-layout-header-height);
}
</style>
