<template>
  <div class="lock-container">
    <div class="lock-wrapper">
      <div class="day">{{ day }}</div>
      <div class="time">{{ time }}</div>
      <img
        class="avatar"
        src="https://foruda.gitee.com/avatar/1677178346321314348/9534923_china-quanda_1627964208.png"
      />
      <h1 class="name">China-Quanda</h1>
      <span class="locked">系统已锁定</span>
      <div class="password-input">
        <el-input
          v-model="password"
          prefix-icon="Lock"
          type="password"
          show-password
          placeholder="锁屏密码"
        >
          <template #append>
            <el-button icon="Promotion" @click="unlock" />
          </template>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/store/setting'
import { formatTime } from '@renderer/utils';
import { RouteLocationRaw, useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const useStore = useSettingStore()
const { updateLockScreen } = useStore
const time = ref('')
const day = ref('')
const password = ref('')

const showTime = () => {
  time.value = formatTime(new Date(), 'hh:mm:ss')
  day.value = formatTime(new Date(), 'YYYY 年 MM 月 DD 日')
}

onMounted(() => {
  showTime()
  setInterval(() => {
    showTime()
  }, 1000)
})

const redirect = route.query.redirect
const unlock = () => {
  if (!password.value) {
    ElMessage({
      message: '请输入密码',
      type: 'warning'
    })
    return false
  }
  if (password.value.length < 6 || password.value !== '123456') {
    ElMessage({
      message: '密码不正确',
      type: 'warning'
    })
    return false
  }
  updateLockScreen(false)
  router.push({ path: redirect || '/' } as RouteLocationRaw)
}
</script>

<style scoped lang="scss">
.lock-container {
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-size: 600%;
  background-image: linear-gradient(to bottom right, #4262bb, #9c8bca, #6989d8, #d550a0);
  animation: bgAnimation 18s linear infinite;

  @keyframes bgAnimation {
    0% {
      background-position: 0% 50%;
    }

    50% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0% 50%;
    }
  }
}

.lock-wrapper {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 330px;
  text-align: center;
  transition: all 0.5s linear 0s;
  background: rgba(255, 255, 255, 0.3);
  padding: 20px;
  border-radius: 10px;
  -webkit-border-radius: 10px;

  .day {
    color: #fff;
    // letter-spacing: 2px;
  }

  .time {
    width: 100%;
    color: #fff;
    font-size: 60px;
    display: inline-block;
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    font-weight: 300;
  }

  .avatar {
    border-radius: 50%;
    border: 5px solid #2874a7;
    width: 220px;
    height: 220px;
  }

  .name {
    text-align: center;
    color: #fff;
    font-size: 18px;
    text-transform: uppercase;
    padding: 20px 0 0 0;
  }

  .locked {
    margin: 15px 0px;
    display: inline-block;
    color: #026f7a;
  }

  .password-input {
    :deep(.is-focus) {
      box-shadow: none;
    }

    :deep(.el-input__wrapper) {
      box-shadow: none;
      background-color: #1c1f20;
    }

    // margin: 10px 15px;
  }
}
</style>
