import type { RouteRecordRaw } from 'vue-router'
import Layout from '@renderer/layout/index.vue'
// 静态路由
export const staticRoutes: RouteRecordRaw[] = [
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
    path: '/Fn/PrintJs',
    name: 'printJs8',
    component: () => import('@renderer/pages/index.vue'),
    meta: { title: '首页3', hidden: false },
    children: [
      {
        path: '/Fn/Cropper/aaa',
        name: 'cropperw7',
        component: () => import('@renderer/pages/index.vue'),
        meta: { title: '首页3-1', hidden: false }
      },
      {
        path: '/index',
        name: 'Index3',
        component: () => import('@renderer/pages/index.vue'),
        meta: { title: '首页3-2', icon: 'icon-shouqicaidan', hidden: false }
      },
      {
        path: '/test',
        name: 'Test4',
        component: () => import('@renderer/pages/test.vue'),
        meta: { title: '首页3-3', icon: 'icon-shouqicaidan', hidden: false }
      }
    ]
  },
  {
    path: '/system',
    name: 'System',
    component: Layout,
    meta: { title: '系统管理', hidden: false },
    children: [
      {
        path: '/system/data',
        name: 'SystemData',
        component: () => import('@renderer/pages/index.vue'),
        meta: { title: '数据管理', hidden: false },
        children: [
          {
            path: '/system/data/dict',
            name: 'SystemDataDict',
            component: () => import('@renderer/pages/index.vue'),
            meta: { title: '数据字典', hidden: false },
            children: []
          },
          {
            path: '/system/data/dictData',
            name: 'SystemDataDictData',
            component: () => import('@renderer/pages/index.vue'),
            meta: { title: '字典数据', hidden: false },
            children: []
          },
          {
            path: '/system/data/category',
            name: 'SystemDataCategory',
            component: () => import('@renderer/pages/index.vue'),
            meta: { title: '数据分类', hidden: false },
            children: []
          }
        ]
      },
      {
        path: '/index',
        name: 'Index6',
        component: () => import('@renderer/pages/index.vue'),
        meta: { title: '系统管理-2', icon: 'icon-shouqicaidan', hidden: false },
        children: []
      }
    ]
  }
]

//css态路由
export const cssStaticRoutes: RouteRecordRaw[] = [
  {
    path: '/demo/css',
    name: 'Css',
    redirect: '/demo/css/demo1',
    meta: { title: 'cssdemo', hidden: false },
    children: [
      {
        path: '/demo/css/demo1',
        name: 'CssDemo1',
        component: () => import('@renderer/pages/index.vue'),
        meta: { title: 'demo1', hidden: false }
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
