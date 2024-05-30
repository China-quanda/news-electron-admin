import { createRouter, createWebHistory } from 'vue-router'
// 拦截器
// import intercept from '@renderer/router/intercept'
// 路由相关数据
import { staticRoutes, cssStaticRoutes } from './routers'
//创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: [...staticRoutes, ...cssStaticRoutes],
  strict: false, // 所有路由区分大小写
  scrollBehavior: (to, from, savedPosition) => (savedPosition ? savedPosition : { left: 0, top: 0 }) // 滚动条
  // scrollBehavior: () => ({ left: 0, top: 0 })
})
// intercept(router)

export default router
