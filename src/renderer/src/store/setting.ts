// import setting from '@/config/setting'
import { defineStore } from 'pinia'
// import { local} from '@/utils/storage'
//2.第一个参数是id,传入一个字符串，第二个参数是是对象
import logo from '@assets/electron.svg'
export const useSettingStore = defineStore('settingStore', {
  state: () => {
    return {
      collapse: false, //是否折叠
      showLogo: true, //是否显示logo
      title: 'news后台管理系统', //标题
      logo: logo, //logo
      refsh: true, //刷新
      showBreadcrumbIcon: false, // 是否显示面包屑图标
      breadcrumbSeparator: '>', // 面包屑分隔符
      dark: false, // 暗号模式
      showModeSwitch: true, // 是否显示模式切换
      showThemeChoice: true, // 是否显示主题切换
      themeColor: 'rgb(64, 158, 255)', // 主题颜色
      lockScreen: false, //锁定屏幕
      isLockScreen: true //是否开启锁屏功能
    }
  },
  getters: {
    // newName: (state) => state.userInfo.name + 'vip',
  },
  actions: {
    //更新屏幕锁定状态
    updateLockScreen(value: boolean) {
      this.lockScreen = value
    },
    // 关闭AppLoading
    closeAppLoading() {
      const AppLoading: Element | null = document.getElementById('AppLoading')
      // 关闭 移除
      AppLoading && AppLoading.remove()
      // 隐藏
      // AppLoading!.style.display = 'none'
    },
    // 设置暗黑模式
    setPageDark(flag: boolean) {
      this.dark = flag
      const el = document.documentElement
      this.dark ? (el.className = 'dark') : (el.className = '')
    },
    // 设置主题色
    setPageThemeColor(color: string) {
      const el = document.documentElement
      if (color) this.themeColor = color
      el.style.setProperty('--el-color-primary', this.themeColor)
    },
    // 设置页面标题
    setPageTitle(pageTitle: string) {
      const title = this.title
      if (pageTitle) {
        const getTitle = `${pageTitle} - ${title}`
        document.title = getTitle
        return getTitle
      }
      return `${title}`
    }
  },
  persist: {
    paths: ['collapse', 'dark', 'themeColor', 'lockScreen']
  }
})
