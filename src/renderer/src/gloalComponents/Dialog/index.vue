<script setup lang="ts">
import { ref, reactive,onUpdated ,computed ,Directive,DirectiveBinding} from 'vue';
const props = defineProps({
	title: {
		type: String,
		default: '提示'
	},
	confirmText: {
		type: String,
		default: '确定'
	},
	cancelText: {
		type: String,
		default: '取消'
	},
	width: {
		type: String,
		default: '500px'
	},
	height: {
		type: String,
		default: '300px'
	},
	zIndex: {
		type: [String, Number],
		default: 2
	},
	show: {
		type: Boolean,
		default: false
	},
	showOverlay: {
		type: Boolean,
		default: true
	},
	showFullscreen: {
		type: Boolean,
		default: true
	},
	showControl: {
		type: Boolean,
		default: true
	},
	showFooter: {
		type: Boolean,
		default: true
	},
	tapClose: {
		type: Boolean,
		default: false
	},
	loading: {
		type: Boolean,
		default: false
	}
});

let style = reactive({
	'z-index': props.zIndex,
	width: props.width,
	height: props.height,
	borderRadius:'10px',
	top: '25%',
	left: '25%'
})

let showIcon = ref(false);
const emit = defineEmits(['close', 'confirm', 'onMini', 'onMax', 'cancel', 'open']);
onUpdated(() => {
	if (props.show) {
		console.log('打开了dialog');
		emit('open');
	}
});
const isFullscreen = computed(() => {
  return style.width == '100vw' && style.height == '100vh' ? true : false
})
const isMini = computed(() => {
  return style.width == props.width  && style.height == props.height ? true : false
})
const tapFullscreenFn = (): void => {
	console.log('全屏');
	emit('onMax');
	style.width = '100vw';
	style.height = '100vh';
	style.borderRadius = ''
	style.top = '0'
	style.left = '0'
};
const onMiniFn = (): void => {
	console.log('最小化');
	emit('onMini');
	style.width = props.width;
	style.height = props.height;
	style.borderRadius = '10px'
	style.top = '25%'
	style.left = '25%'
};
const tapCloseFn = (): void => {
	console.log('关闭');
	emit('close', false);
	// 全屏关闭后还显示的，所以把样式改回默认的
	style.width = props.width;
	style.height = props.height;
	style.borderRadius = '10px'
	style.top = '25%'
	style.left = '25%'
	showIcon.value = false
};
const tapConfirmFn = (): void => {
	console.log(`点击了：${props.confirmText}`);
	emit('confirm');
};
const tapCancel = (): void => {
	console.log(`点击了：${props.cancelText}`);
	emit('cancel');
};
// 自定义移动插件
const vMove:Directive<any,void> = (el:HTMLElement,bingding:DirectiveBinding) => {
	let moveElement = el.firstElementChild as HTMLDivElement
	console.log(moveElement);
	const moveDown = (e:MouseEvent) => {
		if(el.offsetLeft == 0) return
		let X = e.clientX - el.offsetLeft
		let Y = e.clientY - el.offsetTop
		const move = (e:MouseEvent) => {
			console.log(e);
			console.log(el);
			el.style.left = e.clientX - X + 'px'
			el.style.top = e.clientY - Y + 'px'
		}
		document.addEventListener('mousemove',move)
		document.addEventListener('mouseup',()=>{
			document.removeEventListener('mousemove',move)
		})
	}
	moveElement.addEventListener('mousedown',moveDown)
}
</script>
<template >
	<Teleport to="body" >
		<Transition name="dialog-fade">
			<div v-if="show" v-move class="dialog-box" :style="style" @mousewheel.prevent @keyup.esc="tapCloseFn" ref="dialogBox">
				<my-overlay :show="props.showOverlay" :tapClose="props.tapClose" @tapCloseOverlay="tapCloseFn"/>
				<div class="dialog-header">
					<slot name="header">
						<div class="dialog-title">
							<slot name="title">{{ title }}</slot>
						</div>
						<!-- <div class="move"></div> -->
						<div v-if="showControl" class="dialog-control" @mouseenter="showIcon = true" @mouseleave="showIcon = false">
							<slot name="control">
								<div v-if="props.showFullscreen"  v-show="!isFullscreen" class="icon fullscreen" @click="tapFullscreenFn"><my-icon v-show="showIcon" icon="icon-fangda" size="12" color="#515151" /></div>
								<div v-if="props.showFullscreen" v-show="!isMini" class="icon jian" @click="onMiniFn"><my-icon v-show="showIcon" icon="icon-jian" size="14" color="#515151" /></div>
								<div class="icon cha" @click="tapCloseFn"><my-icon v-show="showIcon" icon="icon-x" size="12" color="#515151" /></div>
							</slot>
						</div>
					</slot>
				</div>
				<div class="dialog-container">
					<el-scrollbar><slot></slot></el-scrollbar>
				</div>
				<div v-if="showFooter" class="dialog-footer">
					<slot name="footer">
						<el-button size="small" @click="tapCancel">{{props.cancelText}}</el-button>
						<el-button type="primary" size="small" :loading="loading" @click="tapConfirmFn">{{props.confirmText}}</el-button>
					</slot>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>
<style scoped lang="scss">
.dialog-box {
	position: absolute;
	box-shadow: 0 0 10px #ddd;
	box-sizing: border-box;
	background-color: #fff;
	display: flex;
	flex-direction: column;
}
.dialog-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 15px;
	cursor: move;
	border-bottom: 0.5px solid #ccc;
	.dialog-title {
		font-weight: bold;
	}
	// .move {
	// 	flex: 1;
	// 	cursor: move;
	// 	height: 24px;
	// }
	.dialog-control {
		display: flex;
		.icon {
			cursor: pointer;
			overflow: hidden;
			background-color: aqua;
			margin-left: 6px;
			padding: 0px;
			width: 16px;
			height: 16px;
			box-sizing: border-box;
			display: flex;
			border-radius: 50%;
			align-items: center;
			justify-content: center;
			.icon-fangda {
				transform: scale(0.8);
			}
		}
		.fullscreen {
			background-color: rgb(13, 204, 70);
		}
		.jian {
			background-color: rgb(239, 212, 74);
		}
		.cha {
			background-color: rgb(255 50 43 / 78%);
		}
	}
}
.dialog-container {
	flex: 1;
	margin: 10px 15px;
	overflow: hidden;
}
.dialog-footer {
	padding: 8px 15px;
	text-align: right;
	border-top: 0.5px solid #ccc;
}
// .v-enter-active{
//   transition: opacity 0.3s linear;
// }
// .v-leave-active {
//   transition: opacity 0.2s linear;
// }
// .v-enter-from,
// .v-leave-to {
//   opacity: 0;
// }
// 进入动画
.dialog-fade-enter-active {
  animation: dialog-fade-in 0.2s;
}
// 离开动画
.dialog-fade-leave-active {
  animation: dialog-fade-out 0.2s;
}
 
@keyframes dialog-fade-in {
  0% {
    opacity: 0.3;
		transform: scale(0.3);
  }
  100% {
    opacity: 1;
		transform: scale(1);
  }
}
 
@keyframes dialog-fade-out {
  0% {
    opacity: 1;
		transform: scale(1);
  }
  100% {
    opacity: 0;
		transform: scale(0.3);
  }
}
</style>
