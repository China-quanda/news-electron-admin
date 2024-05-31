//1.创建store
import { defineStore } from 'pinia'
//2.第一个参数是id,传入一个字符串，第二个参数是是对象
export const useUserStore = defineStore('userStore', {
  state: () => {
    return {
      userInfo: {
        name: 'zhangsan',
        age: 23
      },
      token: '12'
    }
  },
  getters: {
    newName: (state) => state.userInfo.name + 'vip'
  },
  actions: {
    //更新整个对象
    updateUserInfo(userInfo: { name: string; age: number }) {
      this.userInfo = userInfo
    },
    //更新对象中某个属性
    updateAge(age: number) {
      this.userInfo.age = age
    },
    //更新基础数据类型
    updateToken(token: string) {
      this.token = token
    }
  }
})
