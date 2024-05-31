<template>
	<div class="login">
	  <div class="form-box">
	    <el-form
	      label-position="right"
	      :model="form"
	      :rules="rules"
	      ref="ruleFormRef"
	      style="max-width: 460px"
				@submit.prevent="toLogin"
	    >
	      <el-form-item prop="name">
	        <el-input v-model="form.name" placeholder="用户名"/>
	      </el-form-item>
	      <el-form-item prop="pwd">
	        <el-input v-model="form.pwd" placeholder="密码"/>
	      </el-form-item>
	      <el-form-item >
	        <el-button type="primary" style="width: 100%;" :loading="loading" native-type="submit"> 登录</el-button>
	      </el-form-item>
	    </el-form>
	  </div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// import {IElForm} from '@/types/element-plus'
import type { FormInstance, FormRules } from 'element-plus'
let route = useRoute()
let router = useRouter()

let loading = ref(false)
const ruleFormRef = ref<FormInstance | null>(null)

	interface Iform {
  name: string
  pwd: string
}

const form = reactive<Iform>({
  name: 'admin',
  pwd:'123456'
})
const rules = reactive<FormRules<Iform>>({
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, max: 16, message: 'Length should be 4 to 16', trigger: 'blur' },
  ],
  pwd: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 30, message: 'Length should be 6 to 30', trigger: 'blur' },
  ],
})

const toLogin = async() => {
	let redirect = route.query.redirect as string || '/'
	await ruleFormRef.value?.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
			if(form.name !== 'admin') return console.log('账号错误')
			if(form.pwd !== '123456') return console.log('密码错误')
			loading.value = true
			setTimeout(() => {
				loading.value = false
				router.push({ path: redirect })
			}, 3000);
    } else {
      console.log('error submit!', fields)
			return console.log('验证失败')
    }
  })
	
}
</script>

<style scoped lang="scss">
	.login{
	  height: 100%;
	  height: 100%;
	  position: relative;
	  background-size: 300%;
	  background-image: linear-gradient(
	    to bottom right,
	    #4262bb,
	    #9c8bca,
	    #3698d0,
	    #6989d8,
	    #d550a0
	  );
	  animation:bgAnimation 8s linear infinite;
	  @keyframes bgAnimation {
	    0%{
	      background-position: 0% 50%;
	    }
	    50%{
	      background-position: 100% 50%;
	    }
	    100%{
	      background-position: 0% 50%;
	    }
	  }
	}
	.form-box{
	  width: 460px;
	  padding: 15px;
	  position: absolute;
	  left: 25%;
	  top: 30%;
	  background-color: #3698d0;
	  border-radius: 8px;
	}
</style>
