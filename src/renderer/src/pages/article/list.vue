<script setup lang="ts">
import { FormInstance} from 'element-plus';
import articleForm from './components/ArticleForm.vue'
// import { getUserList ,deleteUser,addUser,getUserId,editUser} from '@/api/user';
// 表格数据
const tableData = reactive([
  {
		id:1,
		cover_img:'http://127.0.0.1:7001/public/upload/20220306/1646539730775.jpg',
		title:'vue中使用element table，表格参数格式化formatter',
		user:{
			user_name:'admin'
		},
		category:{
			name:'军事'
		},
		read_count:44,
		like_count:20,
		comment_count:90,
		status:'1',
    createTime: 1653315496000
  },
	{
		id:2,
		cover_img:'http://127.0.0.1:7001/public/upload/20220306/1646538670248.jpg',
		title:'webpack2 + vue2 老项目迁移 vite 成功! 是真香啊...',
		user:{
			user_name:'admin'
		},
		category:{
			name:'军事'
		},
		read_count:44,
		like_count:20,
		comment_count:90,
		status:'1',
	  createTime: 1653315496000
	},
	{
		id:3,
		cover_img:'http://127.0.0.1:7001/public/upload/20220305/1646458632384.jpeg',
		title:'推荐一款前后端协作开发神器ApiPost：Postman+Swagger+Mock的复合体',
		user:{
			user_name:'admin'
		},
		category:{
			name:'体育'
		},
		read_count:44,
		like_count:20,
		comment_count:90,
		status:'1',
	  createTime: 1653315496000
	},
	{
		id:4,
		cover_img:'http://127.0.0.1:7001/public/upload/20220305/1646458255027.jpg',
		title:'H5画布 canvas 入门到精通 _ 第一部分(canvas简介、绘制圆形/矩形、案例饼状图绘制)',
		user:{
			user_name:'admin'
		},
		category:{
			name:'娱乐'
		},
		read_count:44,
		like_count:20,
		comment_count:90,
		status:'1',
	  createTime: 1653315496000
	},
])
// 编辑
const edit = (row:any) => {
	console.log('去编辑文章页面',row);
	// router.push(`/article/published?id=${row.id}`)
	// Form = row
	// dialogTitle.value = '编辑'
	// dialogVisible.value = true
};
// 新增
const add = (row:any) => {
	console.log('去新增文章页面',row);
	// router.push(`/article/published`)
	// Form = row
	// dialogTitle.value = '新增'
	// dialogVisible.value = true
};
// 删除
const del = (ids:string[]) => {
	if (!ids.length) {
		ElMessage({
			message: '请选择要删除的选中项',
			type: 'warning'
		});
		return;
	}
	ElMessageBox.confirm('是否删除所选中数据？', '系统提示', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
		draggable: true
	})
		.then(() => {
			console.log(1);

			ElMessage({
				type: 'success',
				message: 'Delete completed'
			});
		})
		.catch(() => {
			console.log(2);

			ElMessage({
				type: 'info',
				message: 'Delete canceled'
			});
		});
	console.log(ids);
};
// 多选表格数据
let delBtnDisabled = ref(true)
let selectableList = reactive<string[]>([])
const selectable = (selection:string[]) =>{
	selectableList = selection
	delBtnDisabled.value = selectableList.length > 0 ? false : true;
	console.log(selectableList);
}

// 分页
let currentPage = ref(1)
let pageSize = ref(10)
let total = ref(100)
let loading = ref<boolean>(false)
const loadList = ()=>{
	console.log('loadList');
	loading.value = true
	setTimeout(() => {
		loading.value = false
	}, 3000);
	
}

interface IsearchForm {
  title: string
  status: number | string
	date :string
}

//搜索
const searchFormRef = ref<FormInstance>()
let searchForm = reactive<IsearchForm>({
 title: '',
 status: '',
 date: '',
})
const value1 = ref<[Date, Date]>([
  new Date(2000, 10, 10, 10, 10),
  new Date(2000, 10, 11, 10, 10),
])
console.log(value1);

const resetSearchForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
	searchForm = reactive<IsearchForm>({
		title: '',
	status: '',
	date: '',
})
  formEl.resetFields()
}

</script>
<template>
	<div class="container">
		<!-- 搜索 -->
		<el-card class="box-card">
			<el-form ref="searchFormRef" :model="searchForm" label-width="80px" status-icon>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="文章标题"><el-input v-model="searchForm.title" placeholder="文章标题" /></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="开启状态">
							<el-select v-model="searchForm.status" clearable placeholder="请选择状态">
								<el-option label="开启" :value="true" />
								<el-option label="关闭" :value="false" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="发布时间">
							<el-date-picker v-model="searchForm.date" type="datetimerange" clearable range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-button icon="Search" type="primary" :disabled="loading" plain>搜索</el-button>
				<el-button icon="Refresh" :disabled="loading" plain @click="resetSearchForm(searchFormRef)">重置</el-button>
			</el-form>
		</el-card>
		<!-- 表格 -->
		<el-card class="box-card">
			<!-- 功能区域 -->
			<div style="display: flex; justify-content: space-between; margin:0px 15px 15px 15px;">
				<div>
					<el-button icon="Plus" type="primary" :disabled="loading" plain @click="add">新增</el-button>
					<el-button icon="EditPen" type="success" :disabled="loading" plain>修改</el-button>
					<el-button icon="Delete" type="danger" :disabled="loading || delBtnDisabled" plain @click="del([])">删除</el-button>
					<el-button icon="Bottom" type="info" :disabled="loading" plain>导出</el-button>
				</div>
				<div>
					<el-tooltip class="box-item" effect="light" content="隐藏/显示 搜索" placement="top">
						<el-button icon="Search" circle :disabled="loading"></el-button>
					</el-tooltip>
					<el-tooltip class="box-item" effect="light" content="刷新" placement="top">
						<el-button icon="Refresh" circle :disabled="loading"></el-button>
					</el-tooltip>
				</div>
			</div>
			<el-table v-loading="loading" :data="tableData" style="width: 100%" @selection-change="selectable">
				<el-table-column align="center" width="40px" type="selection" />
				<el-table-column prop="id" label="编号" align="center" width="50px" />
				<el-table-column prop="type" label="封面" width="180" align="center">
					<template #default="scope">
						<img :src="scope.row.cover_img" style="width: 100px;border-radius: 4px;">
					</template>
				</el-table-column>
				<el-table-column prop="title" label="标题" width="180" align="center" show-overflow-tooltip />
				<el-table-column prop="user.user_name" label="作者" align="center" show-overflow-tooltip />
				<el-table-column prop="category.name" label="分类" align="center" show-overflow-tooltip />
				<el-table-column prop="read_count" label="浏览" align="center" show-overflow-tooltip />
				<el-table-column prop="like_count" label="点赞" align="center" show-overflow-tooltip />
				<el-table-column prop="comment_count" label="评论" align="center" show-overflow-tooltip />
				<el-table-column prop="status" label="状态">
					<template #default="scope">
						<!-- 0:草稿;1:审核中;2:审核通过;3审核失败;4:回收站) -->
						<el-tag type="info" v-if="scope.row.status == 0">草稿箱</el-tag>
						<el-tag type="warning" v-else-if="scope.row.status == 1"
						  >审核中</el-tag
						>
						<el-tag type="success" v-else-if="scope.row.status == 2"
						  >审核通过</el-tag
						>
						<el-tag type="danger" v-else-if="scope.row.status == 3"
						  >审核失败</el-tag
						>
						<el-tag v-else>回收站</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="发布时间" align="center" width="140" />
				<el-table-column label="操作" fixed="right" align="center" width="140">
					<template #default="scope">
						<el-button type="primary" link @click="edit(scope.row)">编辑</el-button>
						<el-button type="danger" link @click="del([scope.row.id])">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 分页 -->
		<div style="margin:15px;box-sizing: border-box; ">
			<my-pagination
			v-model:page="currentPage"
			v-model:limit="pageSize"
			:total="total"
			:disabled="loading"
			:load-list="loadList"
			></my-pagination>
			<!-- <el-pagination
				v-model:current-page="currentPage"
				v-model:page-size="pageSize"
				:pager-count="11"
				:page-sizes="[10, 20, 30, 50]"
				:total="1000"
				:page-count="1000"
				background
				hide-on-single-page
				layout="sizes,prev, pager, next,jumper,total"
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
			/> -->
		</div>
		<article-form></article-form>
	</div>
</template>

<style scoped lang="scss"></style>
