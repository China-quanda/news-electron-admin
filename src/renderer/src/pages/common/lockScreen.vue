<template>
  <div class="lockScreen">
    <div class="form-box">
      <el-form
        ref="ruleFormRef"
        label-position="right"
        :model="form"
        :rules="rules"
        style="max-width: 460px"
      >
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="用户名" />
        </el-form-item>
        <el-form-item prop="pwd">
          <el-input v-model="form.pwd" placeholder="密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="unlock"> 解锁🔓</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingStore } from '@/store/setting'
import { RouteLocationRaw, useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()
const useStore = useSettingStore()
const { updateLockScreen } = useStore

const ruleFormRef = ref()
const form = reactive({
  name: 'admin',
  pwd: '123456'
})
const rules = reactive({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, max: 16, message: 'Length should be 4 to 16', trigger: 'blur' }
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 30, message: 'Length should be 6 to 30', trigger: 'blur' }
  ]
})

// const resetForm = (formEl: FormInstance | undefined) => {
//   if (!formEl) return
//   formEl.resetFields()
// }
const redirect = route.query.redirect
const unlock = () => {
  ruleFormRef.value.validate((valid, fields) => {
    if (!valid) return console.log('error submit!', fields)
    if (form.name !== 'admin') return console.log('账号错误')
    if (form.pwd !== '123456') return console.log('密码错误')
    updateLockScreen(false)
    router.push({ path: redirect || '/' } as RouteLocationRaw)
  })
}
</script>

<style scoped lang="scss">
.lockScreen {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-size: 300%;
  background-image: linear-gradient(to bottom right, #4262bb, #9c8bca, #3698d0, #6989d8, #d550a0);
  animation: bgAnimation 8s linear infinite;
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
.form-box {
  width: 460px;
  padding: 15px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #3698d0;
  border-radius: 8px;
}
</style>
