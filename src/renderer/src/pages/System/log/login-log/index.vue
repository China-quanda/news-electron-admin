<script setup lang="ts">
import { ref ,reactive} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
// 表格数据
const tableData = reactive([
	{
		id: 1, 
		user_id: 'admin', 
		login_ip: '127.0.0.1',
		login_city: '湖南省 长沙市',
		browser: 'Chrome 11',
		os: 'Windows 10',
		log_category:1,
		message:'登录成功',
		status:true,
		createTime: '2023-05-20 20:30:50'
	},
	{
		id: 2, 
		user_id: '你的Maya', 
		login_ip: '127.0.0.1',
		login_city: '湖南省 长沙市',
		browser: 'Chrome 11',
		os: 'Windows 10',
		log_category:2,
		message:'登录成功',
		status:true,
		createTime: '2023-05-20 20:30:50'
	},
	{
		id: 3, 
		user_id: '等待的郭肉肉', 
		login_ip: '127.0.0.1',
		login_city: '湖南省 长沙市',
		browser: 'Chrome 11',
		os: 'Windows 10',
		log_category:3,
		message:'登录成功',
		status:true,
		createTime: '2023-05-20 20:30:50'
	},
	{
		id: 4, 
		user_id: '小郭郭', 
		login_ip: '127.0.0.1',
		login_city: '湖南省 长沙市',
		browser: 'Chrome 11',
		os: 'Windows 10',
		log_category:4,
		message:'登录失败',
		status:false,
		createTime: '2023-05-20 20:30:50'
	},
	{
		id: 5, 
		user_id: '孤独的狼', 
		login_ip: '127.0.0.1',
		login_city: '湖南省 长沙市',
		browser: 'Chrome 11',
		os: 'Windows 10',
		log_category:5,
		message:'登录成功',
		status:true,
		createTime: '2023-05-20 20:30:50'
	},
])
// 删除
const del = ids => {
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
let selectableList = reactive([])
const selectable = (selection) =>{
	selectableList = selection
	delBtnDisabled.value = selectableList.length > 0 ? false : true;
	console.log(selectableList);
}

// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

//搜索
const searchFormRef = ref<FormInstance>()
let searchForm = reactive({
 login_ip: null,
 user_id: null,
 status: null,
 createTime: '',
})
const value1 = ref<[Date, Date]>([
  new Date(2000, 10, 10, 10, 10),
  new Date(2000, 10, 11, 10, 10),
])
const resetSearchForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
	searchForm = reactive({
  login_ip: null,
  user_id: null,
  status: null,
  createTime: '',
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
						<el-form-item label="登录地址"><el-input v-model="searchForm.login_ip"  /></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="姓名"><el-input v-model="searchForm.user_id"  /></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="登录状态">
							<el-select v-model="searchForm.status" clearable placeholder="请选择状态" >
								<el-option label="成功" :value="true" />
								<el-option label="失败" :value="false" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="登录时间">
							<el-date-picker v-model="searchForm.date" type="datetimerange" clearable  range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-button icon="Search" type="primary" plain>搜索</el-button>
				<el-button icon="Refresh" plain @click="resetSearchForm(searchFormRef)">重置</el-button>
			</el-form>
		</el-card>
		<!-- 表格 -->
		<el-card class="box-card">
			<!-- 功能区域 -->
			<div style="display: flex; justify-content: space-between; margin:0px 15px 15px 15px;">
				<div>
					<el-button icon="Delete" type="danger" plain :disabled="delBtnDisabled" @click="del([])">删除</el-button>
					<el-button icon="DocumentChecked" type="warning" plain >清空</el-button>
					<el-button icon="Bottom" type="success" plain>导出</el-button>
				</div>
				<div>
					<el-tooltip class="box-item" effect="light" content="隐藏/显示 搜索" placement="top"><el-button icon="Search" circle></el-button></el-tooltip>
					<el-tooltip class="box-item" effect="light" content="刷新" placement="top"><el-button icon="Refresh" circle></el-button></el-tooltip>
				</div>
			</div>

			<el-table :data="tableData" style="width: 100%" @selection-change="selectable">
				<el-table-column align="center" width="40px" type="selection" />
				<el-table-column prop="id" label="编号" align="center" width="40px" />
				<el-table-column prop="user_id" label="登录用户" align="center" show-overflow-tooltip/>
				<el-table-column prop="login_ip" label="登录地点" show-overflow-tooltip />
				<el-table-column prop="login_city" label="登录城市" show-overflow-tooltip />
				<el-table-column prop="browser" label="浏览器" show-overflow-tooltip />
				<el-table-column prop="os" label="操作系统" show-overflow-tooltip />
				<el-table-column prop="log_category" label="操作类别" align="center" width="160">
					<template #default="scope">
						<el-tag v-if="scope.row.log_category == 0">其它用户</el-tag>
						<el-tag v-if="scope.row.log_category == 1">后台用户</el-tag>
						<el-tag v-if="scope.row.log_category == 2">App用户</el-tag>
						<el-tag v-if="scope.row.log_category == 3">小程序用户</el-tag>
						<el-tag v-if="scope.row.log_category == 4">wap用户</el-tag>
						<el-tag v-if="scope.row.log_category == 5">web端用户</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="status" label="登录状态">
					<template #default="scope">
						<el-tag v-if="scope.row.status">成功</el-tag>
						<el-tag v-else type="info">失败</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="message" label="登录信息" />
				<el-table-column prop="createTime" label="登录时间" align="center" width="140" />
			</el-table>
		</el-card>
		<!-- 分页 -->
		<div style="margin:15px;box-sizing: border-box; ">
			<el-pagination
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
			/>
		</div>
	</div>
</template>

<style scoped lang="scss"></style>
