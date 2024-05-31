<script setup lang="ts">
import { ref, reactive, watch, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
let activeMenu = ref('个人资料');
let menuList = reactive([
	{ name: '个人资料', icon: '', url: '/creator/home',children:[] },
	{ name: '安全设置', icon: '', url: '/creator/home',children:[] },
	{ name: '消息提醒', icon: '', url: '/creator/home',children:[] },
	{ name: '操作日志', icon: '', url: '/creator/home',children:[] },
	{ name: '账号绑定', icon: '', url: '/creator/home',children:[] },
	// { name: '内容管理', icon: '', url: '/creator/content' ,children:[
	// 	{ name: '文章管理', icon: '', url: '/creator/content/article'},
	// 	{ name: '评论管理', icon: '', url: '/creator/content/comment'},
	// ]},
	// { name: '数据报表', icon: '', url: '/creator/data' ,children:[
	// 	{ name: '文章数据', icon: '', url: '/creator/data/article'},
	// 	{ name: '粉丝数据', icon: '', url: '/creator/data/fans'},
	// ]},
	// { name: '帮助中心', icon: '', url: '/creator/help',children:[
	// 	{ name: '常见问题', icon: '', url: '/creator/help/familiarIssue'},
	// ] },
	// { name: '设置', icon: '', url: '/creator/setting' ,children:[
	// 	{ name: '创作设置', icon: '', url: '/creator/setting/creator'},
	// ]},
]);
const handleMenu = menu => {
	// console.log(menu.url);
	activeMenu.value = menu.name;
	// if (!menu.url) return;
	// router.push({ path: menu.url });
};

// 对话框表单
import type { FormInstance, FormRules } from 'element-plus'
const FormRef = ref<FormInstance>()
let Form = reactive({
  id: null,
  name: null,
  address: null,
  birthday: null,
  gender: null,
  introduce: null,
})
const Rules = reactive<FormRules>({
		opassword: [{ required: true, trigger: "blur", message: "密码不能为空" },
		  {
		    min: 6,
		    max: 16,
		    message: "密码的长度在6-16位之间 ",
		    trigger: "blur",
		  }, ],
		  newpassword: [{ required: true, trigger: "blur", message: "密码不能为空" },
		  {
		    min: 6,
		    max: 16,
		    message: "密码的长度在6-16位之间 ",
		    trigger: "blur",
		  }, ],
		  newpassword2: [{ required: true, trigger: "blur", message: "密码不能为空" },
		  {
		    min: 6,
		    max: 16,
		    message: "密码的长度在6-16位之间 ",
		    trigger: "blur",
		  }, ],
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    }
  })
}
</script>

<template>
	<div class="wrap">
		<div class="container">
			<div class="left-box-card">
				<div class="sidebar-menu-box">
					<div class="sidebar-menu-submenu" v-for="menu in menuList" :key="menu.name">
						<div :class="['sidebar-menu-item', activeMenu == menu.name && menu.url ? 'active-menu' : '']" @click="handleMenu(menu)">{{ menu.name }}</div>
						<div
							:class="['sidebar-menu-item', 'sidebar-menu-item-children', activeMenu == item.name ? 'active-menu' : '']"
							v-for="item in menu.children"
							:key="item.name"
							@click="handleMenu(item)"
						>
							<span>{{ item.name }}</span>
						</div>
					</div>
				</div>
			</div>
			<div class="right-box-card">
				<!-- <router-view class="main" /> -->
				<!-- <div v-for="(item, index) in 800" :key="index">{{ index }}</div> -->
				<div class="aqsz">
				  <el-row :gutter="20">
				    <el-col :span="3">
				      <label>
								<img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png">
				      </label>
				    </el-col>
				    <el-col :span="5">
				      <h3>你的Maya</h3>
				    </el-col>
				    <el-col :span="6">
				      <p>角色：<span>超级管理员</span></p>
				      <p>
				        浏览器：<span>Google Inc.</span>
				      </p>
				    </el-col>
				    <el-col :span="10">
				      <p>登录时间：2023-07-30 07:34:27</p>
				      <p>注册时间：2022-02-11 13:43:02</p>
				    </el-col>
				  </el-row>
				</div>

				<div v-if="activeMenu == '个人资料'">
					<my-card title="基本资料">
						<el-form ref="FormRef" :model="Form" :rules="Rules" label-width="80px" status-icon>
							<el-form-item label="用户昵称"><el-input v-model="Form.name" disabled placeholder="昵称" /></el-form-item>
							<el-form-item label="所以地区">
								<el-select v-model="Form.address" clearable placeholder="请选择">
									<el-option label="开启" :value="true" />
									<el-option label="关闭" :value="false" />
								</el-select>
							</el-form-item>
							<el-form-item label="生日"><el-date-picker v-model="Form.birthday" placeholder="请选择您的生日" type="date" clearable /></el-form-item>
							<el-form-item label="用户性别">
								<el-radio-group v-model="Form.gender">
									<el-radio label="女"></el-radio>
									<el-radio label="男"></el-radio>
								</el-radio-group>
							</el-form-item>
							<el-form-item label="个人描述"><el-input type="textarea" v-model="Form.introduce"></el-input></el-form-item>
						</el-form>
						<el-button type="primary" @click="submitForm(FormRef)">保存修改</el-button>
					</my-card>
				</div>

				<div v-if="activeMenu == '安全设置'">
					<el-alert title="锁屏密码为您的登录密码" type="info" center show-icon/> 
					<my-card title="修改密码">
						<el-form ref="FormRef" :model="Form" :rules="Rules" label-width="80px" status-icon>
							<el-form-item prop="opassword" label="旧密码"><el-input v-model="Form.opassword" placeholder="请输入旧密码" show-password /></el-form-item>
							<el-form-item prop="newpassword" label="新密码"><el-input v-model="Form.newpassword" placeholder="请输入新密码" show-password /></el-form-item>
							<el-form-item prop="newpassword2" label="确认密码"><el-input v-model="Form.newpassword2" placeholder="请输入密码" show-password /></el-form-item>
						</el-form>
						<el-button type="primary" @click="submitForm(FormRef)">修改密码</el-button>
					</my-card>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.wrap {
	// background-color: aliceblue;
	background-color: var(--el-bg-color);
}
.container {
	position: relative;
	margin: auto;
	padding-top: 15px;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	width: 100%;
	// height: 100vh;
	// width: $container-min-width;
	min-height: calc(100vh - var(--news-layout-header-height));

}
// 左边盒子
.left-box-card {
	width: 220px;
	margin-right: 15px;
	border-radius: 4px;
	// background-color: #fff;
	background-color: var(--el-bg-color);
	box-shadow: 0 2px 8px 0px rgba(122 192 241 / 30%);
}
.right-box-card {
	display: flex;
	flex-direction: column;
	flex: 1;
	border-radius: 4px;
	// background-color: #fff;
	background-color: var(--el-bg-color);
	box-shadow: 0 2px 8px 0px rgba(122 192 241 / 30%);
}
.sidebar-menu-box {
	padding: 8px;
	color: #909399;

	.sidebar-menu-item {
		cursor: pointer;
		text-align: left;
		padding: 10px;
		letter-spacing: 1px;
		font-size: 14.5px;
		font-weight: 500;
		&:hover {
			border-radius: 3px;
			background: #e8f3ff;
			color: #1d7dfa;
		}
	}
	.sidebar-menu-item-children {
		padding-left: 20px;
	}
	.active-menu {
		border-radius: 3px;
		background: #e8f3ff;
		color: #1d7dfa;
	}
}
.aqsz {
    width: 100%;
    height: 160px;
    padding: 30px 0 0 20px;
    margin-bottom: 18px;
    box-sizing: border-box;
    background-color: #ffffff;
		.el-row {
		    display: flex;
		    flex-wrap: wrap;
		    position: relative;
		    box-sizing: border-box;
		    align-items: center;
		}
  }
</style>
