<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const gotoIndex = () => {
  console.log('router',router)
  console.log('router-getRoutes',router.getRoutes())
  router.push('/index')
  router.push({
    path:'/index',
  })
}
const sizewin = ()=>{
  window.electron.ipcRenderer.send('sizewin')
}
const sendNotification = ()=>{
  window.electron.ipcRenderer.send('notification',{
      title:'title',
      subtitle:"subtitle",
      body:"body",
      icon:'icon',
      replyPlaceholder:"回复",
      hasReply:true,
    })
}
</script>

<template>
  <div>
    <router-link to="/index">去index</router-link>
    <router-link to="/test">去test</router-link>
    <button @click="gotoIndex">go to indexPage </button>
    <button @click="sizewin">ste wind size</button>
    <button @click="sendNotification">send Notification</button>
  </div>


  <RouterView/>
</template>
