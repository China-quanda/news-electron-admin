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
  },
  {
    path: '/common',
    component: Layout,
    name: 'Common',
    meta: { title: 'common', icon: 'icon-shouqicaidan', hidden: false },
    children: [
      {
        path: '/about',
        name: 'about',
        component: () => import('@/pages/common/about.vue'),
        meta: { title: '关于项目', icon: 'icon-shouqicaidan', hidden: false },
        children: []
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/common/login.vue'),
    meta: { title: '登录', hidden: true }
  },
  {
    path: '/lockScreen',
    name: 'LockScreen',
    component: () => import('@/pages/common/lockScreen.vue'),
    meta: { title: '锁屏', hidden: true }
  },
  {
    path: '/error/404',
    name: '404',
    component: () => import('@/pages/common/404.vue'),
    meta: { title: '404', hidden: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error/404',
    name: 'Error',
    meta: { title: '404', hidden: true }
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
