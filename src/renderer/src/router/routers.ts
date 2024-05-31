import type { RouteRecordRaw } from 'vue-router'
import Layout from '@renderer/layout/index.vue'
import systemRoute from './modules/system'

// 静态路由
export const staticRoutes: RouteRecordRaw[] = [
  systemRoute,
  {
    path: '/12',
    component: Layout,
    redirect: '/test',
    name: 'Layout3',
    meta: { title: '首页0', icon: 'icon-shouqicaidan', hidden: false },
    children: []
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Layout',
    meta: { title: '首页1', icon: 'icon-shouqicaidan', hidden: false },
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@renderer/pages/dashboard.vue'),
        meta: { title: '首页1-1', icon: 'icon-shouqicaidan', hidden: false }
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    name: 'Layout2',
    meta: { title: '首页2', icon: 'icon-shouqicaidan', hidden: false },
    children: [
      {
        path: '/index',
        name: 'Index2',
        component: () => import('@renderer/pages/index.vue'),
        meta: { title: '首页2-2', icon: 'icon-shouqicaidan', hidden: false },
        children: []
      },
      {
        path: '/test',
        name: 'Test2',
        component: () => import('@renderer/pages/test.vue'),
        meta: { title: '首页2-3', icon: 'icon-shouqicaidan', hidden: false },
        children: []
      }
    ]
  }
]

//动态路由 占位 未启用
export const dynamicRoutes: RouteRecordRaw[] = [
  {
    path: '/home',
    name: 'home',
    component: () => import('@renderer/pages/index.vue'),
    meta: {
      title: 'halou'
    }
  }
]
