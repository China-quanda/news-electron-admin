<script setup lang="ts" name="Menu">
import { useSettingStore } from '@store/setting'
import { useRoute } from 'vue-router'
const route = useRoute()
const useStore = useSettingStore()
const props = defineProps(['routes'])
</script>

<template>
  <el-scrollbar>
    <el-menu
      :default-active="route.path"
      :collapse="useStore.collapse"
      unique-opened
      :collapse-transition="true"
      router
    >
      <template v-for="(item1, index1) in routes" :key="index1">
        <el-menu-item
          v-if="item1?.children && item1?.children.length == 0 && !item1.meta.hidden"
          :index="item1.path"
        >
          <el-icon><setting /></el-icon>
          <template #title>{{ item1.meta.title }}</template>
        </el-menu-item>

        <el-menu-item
          v-if="item1?.children && item1?.children.length == 1 && !item1.meta.hidden"
          :key="item1.children[0].path"
          :index="item1.children[0].path"
        >
          <el-icon><setting /></el-icon>
          <template #title>{{ item1.children[0].meta.title }}</template>
        </el-menu-item>

        <el-sub-menu
          v-if="item1?.children && item1?.children.length > 1 && !item1.meta.hidden"
          :index="item1.name"
        >
          <template #title>
            <el-icon><location /></el-icon>
            <span>{{ item1.meta.title }}</span>
          </template>

          <template v-for="(item2, index2) in item1.children" :key="index2">
            <el-sub-menu
              v-if="item2?.children && item2?.children.length && !item2.meta.hidden"
              :index="item2.name"
            >
              <template #title>
                <el-icon><location /></el-icon>
                <span>{{ item2.meta.title }}</span>
              </template>
              <template v-for="(item3, index3) in item2.children">
                <el-menu-item v-if="!item3.meta.hidden" :key="index3" :index="item3.path">
                  <el-icon><setting /></el-icon>
                  <template #title>{{ item3.meta.title }}</template>
                </el-menu-item>
              </template>
            </el-sub-menu>

            <el-menu-item
              v-if="!item2?.children || (item2?.children && !item2?.children.length)"
              :index="item2.path"
            >
              <el-icon><setting /></el-icon>
              <template #title>{{ item2.meta.title }}</template>
            </el-menu-item>
          </template>
        </el-sub-menu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<style scoped lang="scss">
.el-scrollbar {
  overflow-y: auto;
  height: calc(100vh - 60px);
}
.el-menu {
  border: none;
}
</style>
