<script setup lang="ts">
import { ref ,reactive ,computed} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
// 表格数据
const tableData = reactive([
	{
		id: 1, 
		user_id: 'admin', 
		log_module: '管理后台 - 操作日志',
		log_title: '导出操作日志',
		request_ip: '192.168.2.12',
		request_url: '/system/log/operate-log',
		request_method: 'POST',
		log_method:'com.oss.web.controller.maintain.MaintainPlanJoinController.add()',
		request_param:{"deptName":"维保部","nickName":"李秋林","deptId":1503182106685870139,"remark":"","updateTime":1686195888000,"deviceNo":"930a7b70e778f7f9","delFlag":"0","params":{},"deviceId":1663736169152622594,"userId":1503182106685870162,"orgId":1503182106685870130,"createBy":1503182106685870162,"accessDate":1686195888000,"createTime":1685500588000,"lastAccessDate":1686195893000,"updateBy":1,"tenantId":0,"searchValue":"","deviceBrand":"huawei","status":"1"},
		log_type: 5,
		log_category:1,
		ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
		duration: '19 ms',
		json_result:{"reqVO":{"code":null,"name":null,"status":null},"response":"[ignore]"},
		status:true,
		createTime: '2023-05-20 20:30:50'
	},
	{
		id: 1, 
		user_id: 'admin', 
		log_module: '管理后台 - 操作日志',
		log_title: '导出操作日志',
		request_ip: '192.168.2.12',
		request_url: '/system/log/operate-log',
		request_method: 'POST',
		log_method:'com.oss.web.controller.maintain.MaintainPlanJoinController.add()',
		request_param:{"deptName":"维保部","nickName":"李秋林","deptId":1503182106685870139,"remark":"","updateTime":1686195888000,"deviceNo":"930a7b70e778f7f9","delFlag":"0","params":{},"deviceId":1663736169152622594,"userId":1503182106685870162,"orgId":1503182106685870130,"createBy":1503182106685870162,"accessDate":1686195888000,"createTime":1685500588000,"lastAccessDate":1686195893000,"updateBy":1,"tenantId":0,"searchValue":"","deviceBrand":"huawei","status":"1"},
		log_type: 5,
		log_category:1,
		ua: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
		duration: '19 ms',
		json_result:{"reqVO":{"code":null,"name":null,"status":null},"response":"[ignore]"},
		status:true,
		createTime: '2023-05-20 20:30:50'
	},
	
])
// 详情
const info = row => {
	dialogData = row
	dialogVisible.value = true
};
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
 user_id: null,
 log_module: null,
 log_type: [],
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
  user_id: null,
  log_module: null,
  log_type: [],
  status: null,
  createTime: '',
})
  formEl.resetFields()
}
// 对话框
const dialogVisible = ref(false)
const closeDialog = ()=>{
	dialogVisible.value = false
	console.log('closeDialog');
}
// 描述信息
let dialogData = reactive({})
</script>

<template>
	<div class="container">
		<!-- 搜索 -->
		<el-card class="box-card">
			<el-form ref="searchFormRef" :model="searchForm" label-width="80px" status-icon>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="操作人员"><el-input v-model="searchForm.user_id"  /></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="系统模块"><el-input v-model="searchForm.log_module"  /></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="操作类型">
							<el-select v-model="searchForm.log_type" clearable placeholder="请选择状态" >
								<el-option label="其他" :value="0" />
								<el-option label="新增" :value="1" />
								<el-option label="修改" :value="2" />
								<el-option label="删除" :value="3" />
								<el-option label="查询" :value="4" />
								<el-option label="导出" :value="5" />
								<el-option label="授权" :value="6" />
								<el-option label="导入" :value="7" />
								<el-option label="强退" :value="8" />
								<el-option label="生成代码" :value="9" />
								<el-option label="清空数据" :value="10" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="操作状态">
							<el-select v-model="searchForm.status" clearable placeholder="请选择状态" >
								<el-option label="成功" :value="true" />
								<el-option label="失败" :value="false" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="操作时间">
							<el-date-picker v-model="searchForm.date" type="datetimerange" clearable  range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-button icon="Search" type="primary" plain>搜索</el-button>
						<el-button icon="Refresh" plain @click="resetSearchForm(searchFormRef)">重置</el-button>
					</el-col>
				</el-row>
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
				<el-table-column prop="user_id" label="操作用户" align="center" show-overflow-tooltip/>
				<el-table-column prop="log_module" label="操作模块" align="center" show-overflow-tooltip/>
				<el-table-column prop="log_title" label="操作标题" align="center" show-overflow-tooltip/>
				<el-table-column prop="request_ip" label="请求ip地址" show-overflow-tooltip />
				<el-table-column prop="request_url" label="请求url地址" show-overflow-tooltip />
				<el-table-column prop="request_method" label="请求方式" show-overflow-tooltip />
				<el-table-column prop="log_method" label="请求方法" show-overflow-tooltip />
				<el-table-column prop="ua" label="操作ua" show-overflow-tooltip />
				<el-table-column prop="log_type" label="操作类型" align="center" width="160">
					<template #default="scope">
						<el-tag v-if="scope.row.log_type == 0">其他</el-tag>
						<el-tag v-if="scope.row.log_type == 1">新增</el-tag>
						<el-tag v-if="scope.row.log_type == 2">修改</el-tag>
						<el-tag v-if="scope.row.log_type == 3">删除</el-tag>
						<el-tag v-if="scope.row.log_type == 4">查询</el-tag>
						<el-tag v-if="scope.row.log_type == 5">导出</el-tag>
						<el-tag v-if="scope.row.log_type == 6">授权</el-tag>
						<el-tag v-if="scope.row.log_type == 7">导入</el-tag>
						<el-tag v-if="scope.row.log_type == 8">强退</el-tag>
						<el-tag v-if="scope.row.log_type == 9">生成代码</el-tag>
						<el-tag v-if="scope.row.log_type == 10">清空数据</el-tag>
					</template>
				</el-table-column>
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
				<el-table-column prop="duration" label="执行时长" />»
				<el-table-column prop="status" label="操作状态">
					<template #default="scope">
						<el-tag v-if="scope.row.status">成功</el-tag>
						<el-tag v-else type="info">失败</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="操作时间" align="center" width="140" />
				<el-table-column label="操作" fixed="right" align="center" width="100">
					<template #default="scope">
						<el-button type="primary" link  @click="info(scope.row)">详情</el-button>
					</template>
				</el-table-column>
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
		<!-- 对话框 -->
		<el-dialog v-model="dialogVisible" title="操作日志详情" draggable @close="closeDialog">
			<el-descriptions
			    :column="1"
			    size="small"
			    border
			  >
			    <el-descriptions-item label="操作编号" width="80px">{{dialogData.id}}</el-descriptions-item>
			    <el-descriptions-item label="操作用户" >{{dialogData.user_id}}</el-descriptions-item>
			    <el-descriptions-item label="操作模块" >{{dialogData.log_module}}</el-descriptions-item>
			    <el-descriptions-item label="操作标题" >{{dialogData.log_title}}</el-descriptions-item>
			    <el-descriptions-item label="操作类型" >{{dialogData.log_type}}</el-descriptions-item>
					<el-descriptions-item label="操作类别" >{{dialogData.log_category}}</el-descriptions-item>
			    <el-descriptions-item label="操作ua" >{{dialogData.ua}}</el-descriptions-item>
			    <el-descriptions-item label="请求ip地址" >{{dialogData.request_ip}}</el-descriptions-item>
			    <el-descriptions-item label="请求url地址" >{{dialogData.request_url}}</el-descriptions-item>
			    <el-descriptions-item label="请求方式" >{{dialogData.request_method}}</el-descriptions-item>
			    <el-descriptions-item label="请求方法" >{{dialogData.log_method}}</el-descriptions-item>
			    <el-descriptions-item label="请求参数" >{{dialogData.request_param}}</el-descriptions-item>
			    <el-descriptions-item label="返回参数" >{{dialogData.json_result}}</el-descriptions-item>
			    <el-descriptions-item label="执行时长" >{{dialogData.duration}}</el-descriptions-item>
			    <el-descriptions-item label="操作状态" >{{dialogData.status}}</el-descriptions-item>
			    <el-descriptions-item label="操作时间" >{{dialogData.user_id}}</el-descriptions-item>
			  </el-descriptions>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss"></style>
