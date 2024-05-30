<script setup lang="ts" name="Menu">
import { useSettingStore } from '@store/setting'
import { useRoute } from 'vue-router'
const route = useRoute()
const useStore = useSettingStore()
defineProps(['routes'])
</script>

<template>
  <el-scrollbar>
    <el-menu
      :default-active="route.path"
      :collapse="useStore.collapse"
      unique-opened
      :collapse-transition="false"
      router
    >
      <template v-for="item in routes" :key="item.path">
        <!-- 没有子路由 -->
        <template v-if="!item.children">
          <el-menu-item v-if="!item.meta.hidden" :key="item.path" :index="item.path">
            <!-- <el-icon><my-icon :icon="item.meta.icon" /></el-icon> -->
            <el-icon><setting /></el-icon>
            <span>{{ item.meta.title }}</span>
          </el-menu-item>
        </template>
        <!-- 有子路由，但只要一个子路由 -->
        <template v-if="item.children && item.children.length == 1">
          <el-menu-item
            v-if="!item.children[0].meta.hidden"
            :key="item.children[0].path"
            :index="item.children[0].path"
          >
            <el-icon>
              <!-- :icon="item.children[0].meta.icon" -->
              <el-icon><setting /></el-icon>
            </el-icon>
            <span>{{ item.children[0].meta.title }}</span>
          </el-menu-item>
        </template>
        <!-- 有子路由，有多个子路由 -->
        <template v-if="item.children && item.children.length > 1">
          <el-sub-menu v-if="!item.meta.hidden" :index="item.path">
            <template #title>
              <!-- <el-icon><my-icon :icon="item.meta.icon" /></el-icon> -->
              <el-icon><setting /></el-icon>
              <span>{{ item.meta.title }}</span>
            </template>
            <!-- 递归调用自己 -->
            <!-- <Menu :routes="item.children" /> -->
          </el-sub-menu>
        </template>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.el-menu {
  border: none;
}
</style>
