<template>
  <el-card shadow="hover" header="时钟" class="item-background">
    <div class="time">
      <h2>{{ time }}</h2>
      <p>{{ day }}</p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { formatTime } from '@/utils/gloal'
const time = ref<string>('')
const day = ref<string>('')
onMounted(() => {
  showTime()
  setInterval(() => {
    showTime()
  }, 1000)
})
const showTime = () => {
  time.value = formatTime(new Date(), 'hh:mm:ss')
  day.value = formatTime(new Date(), 'YYYY年MM月DD日')
}
</script>

<style scoped lang="scss">
:deep(.el-card__header) {
  border-bottom: 0;
  padding: 15px 20px 0 20px;
}
.item-background {
  background: linear-gradient(to right, #8e54e9, #4776e6);
  color: #fff;
}

.time h2 {
  font-size: 40px;
}

.time p {
  font-size: 14px;
  margin-top: 13px;
  opacity: 0.7;
}
</style>
