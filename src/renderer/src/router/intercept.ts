// import NProgress from '@/config/nprogress'
// import {setPageTitle} from '@/utils/commonFunction';
// import {createPinia} from 'pinia'
// import {useUserStore} from '@/store/user'
// import { useSettingStore } from '@/store/setting'
// import Loading from '@/utils/loading'
// const userStore = useUserStore(createPinia())
// const settingStore = useSettingStore(createPinia());
// import { local } from '@/utils/storage'
const whiteList = ['/login','/error/404'] // 定义白名单  所有不受权限控制的页面
export default (router)=>{
  router.beforeEach((to, from, next) => {
    // setPageTitle(to.meta.title)
    // NProgress.start()
     //  首先判断有无token
  // if (userStore.token) {
  //   if (to.path === '/login') {
  //     next('/')
  //   } else {
  //     // 平台开启了锁屏功能和用户已经锁屏了
  //     if (settingStore.isLockScreen && local.get('lockScreen')) {  
  //       if (to.path === '/lockScreen') {
  //         next() 
  //       } else {
  //         // 只要锁屏了无论进入什么页面都跳转 “/LockScreen” 浏览器返回建也不行
  //         next({path:'/lockScreen',query:{redirect:to.path}})  
  //       }
  //     } else {
  //       next() 
  //     }
  //   }
  // } else {
  //   // 如果没有token
  //   if (whiteList.indexOf(to.path) > -1) {
  //     next()
  //   } else {
  //     next({path:'/login',query:{redirect:to.path}}) // 跳到登录页
  //   }
  // }
  })
  
  router.afterEach((to, from, next) => {
    // NProgress.done()
    // setPageTitle(to.meta.title)
    // Loading.close()
  })
  
  router.onError(() => {
    // 路由发生错误后销毁进度条
    // Nprogress.remove()
  })
}
