<script setup lang="ts">
defineOptions({
  name: 'Sidebar'
})
import { reactive } from 'vue'
import { staticRoutes } from '@router/routers'
import { useSettingStore } from '@store/setting'
import Logo from './Logo.vue'
import Menu from './Menu.vue'
const useStore = useSettingStore()
const routes = reactive([...staticRoutes])

const routesa = [
  {
    path: '/index1',
    name: 'index1',
    meta: {
      title: '首页1',
      icon: 'icon-shouqicaidan',
      hidden: false
    },
    children: []
  },
  {
    path: '/index2',
    name: 'index2',
    meta: {
      title: '首页2',
      icon: 'icon-shouqicaidan',
      hidden: false
    },
    children: [
      {
        path: '/index2-1',
        name: 'index2-1',
        meta: {
          title: '首页2-1',
          icon: 'icon-shouqicaidan',
          hidden: false
        },
        children: []
      },
      {
        path: '/index2-2',
        name: 'index2-2',
        meta: {
          title: '首页2-2',
          icon: 'icon-shouqicaidan',
          hidden: false
        },
        children: []
      }
    ]
  },
  {
    path: '/',
    meta: {
      title: '首页3',
      icon: 'icon-shouqicaidan',
      hidden: false
    },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        meta: {
          title: '首页3-1',
          icon: 'icon-shouqicaidan',
          hidden: false
        },
        children: []
      },
      {
        path: '/index',
        name: 'Index',
        meta: {
          title: 'index3-2',
          icon: 'icon-shouqicaidan',
          hidden: false
        }
      },
      {
        path: '/test',
        name: 'Test',
        meta: {
          title: 'test3-3',
          icon: 'icon-shouqicaidan',
          hidden: false
        }
      }
    ]
  }
]
</script>

<template>
  <div class="sidebar" :class="{ 'is-collapse': !useStore.collapse }">
    <Logo v-if="useStore.showLogo" />
    <Menu :routes="routes"></Menu>
  </div>
</template>

<style scoped>
.sidebar {
  min-height: 100vh;
  background-color: var(--el-bg-color);
  box-shadow: var(--el-box-shadow-lighter);
}
.is-collapse {
  width: 200px;
}
</style>
