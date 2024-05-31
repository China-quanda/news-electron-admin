/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Router } from 'vue-router'
import NProgress from '@/plugins/nprogress'
import { createPinia } from 'pinia'
import { useUserStore } from '@/store/user'
import { useSettingStore } from '@/store/setting'
const userStore = useUserStore(createPinia())
const settingStore = useSettingStore(createPinia())
import { useStorage } from '@vueuse/core'

const whiteList = ['/login', '/error/404'] // 定义白名单  所有不受权限控制的页面

export default (router: Router) => {
  router.beforeEach((to, _from, next) => {
    const state = useStorage('settingStore', {}, undefined, {
      serializer: {
        read: (v: any) => (v ? JSON.parse(v) : null),
        write: (v: any) => JSON.stringify(v)
      }
    })
    const lockScreen = state.value.lockScreen
    settingStore.setPageTitle(to.meta.title as string)
    NProgress.start()
    //  首先判断有无token
    if (userStore.token) {
      if (to.path === '/login') {
        next('/')
      } else {
        // 平台开启了锁屏功能和用户已经锁屏了
        if (settingStore.isLockScreen && lockScreen) {
          if (to.path === '/lockScreen') {
            next()
          } else {
            // 只要锁屏了无论进入什么页面都跳转 “/LockScreen” 浏览器返回建也不行
            next({ path: '/lockScreen', query: { redirect: to.path } })
          }
        } else {
          next()
        }
      }
    } else {
      // 如果没有token
      if (whiteList.includes(to.path)) {
        next()
      } else {
        next({ path: '/login', query: { redirect: to.path } }) // 跳到登录页
      }
    }
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  router.afterEach((to, _from, _next) => {
    NProgress.done()
    settingStore.setPageTitle(to.meta.title as string)
    settingStore.closeAppLoading()
  })

  router.onError(() => {
    // 路由发生错误后销毁进度条
    NProgress.remove()
  })
}
