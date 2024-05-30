// import setting from '@/config/setting'
import { defineStore } from 'pinia'
// import { local} from '@/utils/storage'
//2.第一个参数是id,传入一个字符串，第二个参数是是对象
import logo from '@assets/electron.svg'
export const useSettingStore = defineStore('setting', {
  state: () => {
    return {
      // collapse: local.get('collapse') || setting.collapse,//是否折叠
      collapse: false, //是否折叠
      showLogo: true, //是否显示logo
      title: 'news后台管理系统', //标题
      logo: logo, //logo
      refsh: true, //刷新
      showBreadcrumbIcon: false, // 是否显示面包屑图标
      breadcrumbSeparator: '>', // 面包屑分隔符
      // dark: local.get('dark') || false, // 暗号模式
      showModeSwitch: true, // 是否显示模式切换
      showThemeChoice: true, // 是否显示主题切换
      // themeColor: local.get('themeColor') || 'rgb(64, 158, 255)', // 主题颜色
      // lockScreen:local.get('lockScreen') ||false, //锁定屏幕
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
      // local.set('lockScreen',value)
    }
  }
})
