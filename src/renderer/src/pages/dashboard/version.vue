<template>
  <el-card shadow="hover" header="版本信息">
    <div style="height: 210px; text-align: center">
      <img src="@/assets/images/version.svg" style="height: 140px" />
      <h2 style="margin-top: 15px">Maya 1.0.0</h2>
      <!-- <h2 style="margin-top: 15px;">Maya {{$CONFIG.CORE_VER || 1}}</h2> -->
      <p style="margin-top: 5px">最新版本 {{ version }}</p>
    </div>
    <div style="margin-top: 20px">
      <el-button type="primary" plain round @click="goLog">更新日志</el-button>
      <el-button type="primary" plain round @click="goGit">gitee</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { getVersion } from '@/api/system/app'
const version = ref<string>('loading...')
const loadVersion = async () => {
  const version = await getVersion()
  version.value = version?.version || '1.2.2'
}
const goLog = () => {
  window.open('https://github.com/SCUI/SCUI/releases')
}
const goGit = () => {
  window.open('https://gitee.com/SCUI/SCUI')
}
</script>

<style lang="scss" scoped></style>
