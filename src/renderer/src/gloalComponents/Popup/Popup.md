#Popup 弹出层

**介绍**
弹出层容器，用于展示弹窗、信息提示等内容，支持上、下、左、右方向弹出。组件只提供容器，内部内容由用户自定义。

**使用**

```
<script setup lang="ts">
  import {ref} from 'vue'
  let show = ref(false)
</script>

<template>
	
	<button @click="show = true" >打开弹出层</button>
	
	<my-popup title="新增角色" tapClose :show="show" @close="show=false" >
			<div>里面的内容</div>
	</my-popup>
	
</template>
```


**Props属性**
| 参数 | 说明 | 类型 | 默认值 | 是否必填
| ----- | ----------------- | ------ | ------ |------ |
| title | 标题 | string | '提示' | 否 |
| confirmText | 确定按钮文字 | string | '标题' | 否 |
| cancelText | 取消按钮文字 | string | '标题' | 否 |
| width |  宽度 | string | '360px' | 否 |
| height | 高度 | string | '100vh' | 否 |
| position | 弹出位置；top / right / bottom  | string | 'right' | 否 |
| z-index | z-index 层级 | string,Number | 2 | 否 |
| show | 是否显示弹出层 | boolean | false | 否 |
| showOverlay | 是否显示遮罩层 | boolean | true | 否 |
| showFullscreen | 是否显全屏按钮 | boolean | true | 否 |
| showControl | 是否显示Control控制开关 | boolean | true | 否 |
| showFooter | 是否显示Footer底部 | boolean | true | 否 |
| tap-close | 点击遮罩层是否关闭 | boolean | false | 否 |
| round | 是否显示圆角 | boolean | true | 否 |
| loading | 确定按钮loading加载状态，自定义Footer插槽时无效 | boolean | false | 否 |



**Events事件**

| 事件 | 说明 | 回调参数
| ----- | ----------------- | ----- |
| confirm | 点击确认按钮时触发 | - |
| cancel | 点击取消按钮时触发 | - |
| open | 打开弹出层时触发 | - |
| close | 关闭弹出层时触发 | - |
| onMini | 点击全屏时触发 | - |
| onMini | 点击最小化时触发 | - |

**Slots插槽**

| 名称 | 说明 |
| ----- | ----------------- |
| default | 自定义内容 |
| title | 自定义标题 |
| control | 自定义控制开关 |
| footer | 自定义底部 |

**组件使用位置 and 使用次数：**

| 使用组件 | 使用次数 |
| ----- | ----------------- |
|  | |
