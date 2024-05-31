<template>
	<div class="card-box" :class="{'card-box-shadow':boxShadow}">
		<div v-if="showHeader" class="card-header">
			<div class="header-title">
				<slot name="title">
					{{title}}
				</slot>
			</div>
			<div class="status" @click="handleStatus" >
				<slot name="status">{{status}}</slot>
			</div>
		</div>
		<div class="card-body">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {watch} from 'vue';
const emits = defineEmits(['tapStatus']);
const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	status: {
		type: String,
		default: ''
	},
	showHeader:{
		type:Boolean,
		default:true
	},
	boxShadow:{
		type:Boolean,
		default:true
	}
})
const handleStatus = ()=>{
	emits('tapStatus')
}
</script>
<style lang="scss" scoped>
.card-box {
	background-color: #fff;
	border-radius: 4px;
	font-size: 14px;
	overflow: hidden;
	transition: .3s;
}
.card-box-shadow{
	box-shadow: 0 2px 8px 0px rgba(122, 192, 241, 0.3);
}
.card-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	padding: 15px;
	border-bottom: 1px solid #EBEEF5;
	.header-title{
		color: #303133;
		letter-spacing: 1px;
		font-size: 15.5px;
	}
	.status{
			cursor:pointer;
		&:hover{
			color: #3c9cff;
		}
	}
}
.card-body{
	padding: 15px;
}
</style>
