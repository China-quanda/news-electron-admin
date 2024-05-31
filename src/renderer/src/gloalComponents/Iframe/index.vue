<script setup lang="ts">
import { ref ,onMounted} from 'vue'

const props = defineProps({
	link: {
		type: String,
    required: true,
		default: 'http://www.i6i8.cn'
	},
	iframeId: {
		type: [String],
    required: true,
    default: 'iframeId'
	}
});
const sidebarOpened = true //是否打开侧边栏
const sidebarisCollapse = 70 //关闭边栏宽度
const sidebarNoCollapse = 200 // 开侧边栏宽度
const HeaderHeight = 60 // 头部高度

// 初始化
onMounted(()=>{
  initIframe()
})
// 监听窗口大小  如果系统侧边栏或者顶部导航是可收缩的，还需监听收缩事件，改变 iframe 
window.onresize = () => {
  initIframe()
}
const initIframe =()=> {
      const iframe = document.getElementById(props.iframeId)
      const deviceWidth = document.body.clientWidth
      const deviceHeight = document.body.clientHeight
      iframe.style.width = sidebarOpened ? (Number(deviceWidth) - sidebarNoCollapse) + 'px' : (Number(deviceWidth) - sidebarisCollapse) + 'px'
      iframe.style.height = (Number(deviceHeight) - HeaderHeight) + 'px'
    }
</script>

<template>
  <div class="iframe">
    <iframe :id="iframeId" :ref="iframeId" :src="url" frameborder="0" />
  </div>
</template>

<style scoped>
.iframe {
    width: 100%;
    height: 100%;
  }
</style>
