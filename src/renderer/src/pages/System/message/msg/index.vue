<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
// 表格数据
const tableData = reactive([
	{
		userId: 1,
		userType: 2,
		templateId: 2,
		templateCode: 'register',
		templateNickname: '系统消息',
		templateContent: '你好，欢迎 123 加入大家庭！',
		templateType: 2,
		templateParams: {
			name: '123'
		},
		readStatus: true,
		readTime: 1674960726000,
		id: 8,
		createTime: 1674949821000
	},
	{
		userId: 1,
		userType: 2,
		templateId: 1,
		templateCode: 'test',
		templateNickname: '123',
		templateContent: '我是 2，我开始 3 了',
		templateType: 1,
		templateParams: {
			name: '2',
			what: '3'
		},
		readStatus: true,
		readTime: 1674960726000,
		id: 7,
		createTime: 1674949521000
	},
	{
		userId: 1,
		userType: 2,
		templateId: 1,
		templateCode: 'test',
		templateNickname: '123',
		templateContent: '我是 芋艿，我开始 写代码 了',
		templateType: 1,
		templateParams: {
			name: '芋艿',
			what: '写代码'
		},
		readStatus: true,
		readTime: 1674960726000,
		id: 6,
		createTime: 1674944527000
	},
	{
		userId: 1,
		userType: 2,
		templateId: 1,
		templateCode: 'test',
		templateNickname: '123',
		templateContent: '我是 芋艿，我开始 写代码 了',
		templateType: 1,
		templateParams: {
			name: '芋艿',
			what: '写代码'
		},
		readStatus: true,
		readTime: 1675961224000,
		id: 5,
		createTime: 1674944502000
	},
	{
		userId: 103,
		userType: 2,
		templateId: 2,
		templateCode: 'register',
		templateNickname: '系统消息',
		templateContent: '你好，欢迎 哈哈 加入大家庭！',
		templateType: 2,
		templateParams: {
			name: '哈哈'
		},
		readStatus: false,
		readTime: null,
		id: 4,
		createTime: 1674939740000
	},
	{
		userId: 1,
		userType: 2,
		templateId: 1,
		templateCode: 'test',
		templateNickname: '123',
		templateContent: '我是 1，我开始 2 了',
		templateType: 1,
		templateParams: {
			name: '1',
			what: '2'
		},
		readStatus: true,
		readTime: 1675961224000,
		id: 3,
		createTime: 1674906304000
	},
	{
		userId: 1,
		userType: 2,
		templateId: 1,
		templateCode: 'test',
		templateNickname: '123',
		templateContent: '我是 1，我开始 2 了',
		templateType: 1,
		templateParams: {
			name: '1',
			what: '2'
		},
		readStatus: true,
		readTime: 1675961224000,
		id: 2,
		createTime: 1674906248000
	}
]);
// 详情
const info = row => {
	dialogData = row;
	dialogVisible.value = true;
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
let delBtnDisabled = ref(true);
let selectableList = reactive([]);
const selectable = selection => {
	selectableList = selection;
	delBtnDisabled.value = selectableList.length > 0 ? false : true;
	console.log(selectableList);
};

// 分页
const currentPage = ref(1);
const pageSize = ref(10);
const handleSizeChange = (val: number) => {
	console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
	console.log(`current page: ${val}`);
};

//搜索
const searchFormRef = ref<FormInstance>();
let searchForm = reactive({
	userId: null,
	templateCode: null,
	userType: null,
	templateType: null,
	status: null,
	createTime: ''
});
const value1 = ref<[Date, Date]>([new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)]);
const resetSearchForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	searchForm = reactive({
		userId: null,
		templateCode: null,
		userType: null,
		templateType: null,
		status: null,
		createTime: ''
	});
	formEl.resetFields();
};
// 对话框
const dialogVisible = ref(false);
const closeDialog = () => {
	dialogVisible.value = false;
	console.log('closeDialog');
};
// 描述信息
let dialogData = reactive({});
</script>

<template>
	<div class="container">
		<!-- 搜索 -->
		<el-card class="box-card">
			<el-form ref="searchFormRef" :model="searchForm" label-width="80px" status-icon>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="用户编号"><el-input v-model="searchForm.userId" /></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="模版编码"><el-input v-model="searchForm.templateCode" /></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="用户类型">
							<el-select v-model="searchForm.userType" clearable placeholder="请选择用户类型">
								<el-option label="会员" :value="0" />
								<el-option label="管理员" :value="1" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="模版类型">
							<el-select v-model="searchForm.templateType" clearable placeholder="请选择模版类型">
								<el-option label="通知公告" :value="true" />
								<el-option label="系统消息" :value="false" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="操作时间">
							<el-date-picker v-model="searchForm.date" type="datetimerange" clearable range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
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
					<el-button icon="DocumentChecked" type="warning" plain>清空</el-button>
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
				<el-table-column prop="userType" label="用户类型" align="center" width="160">
					<template #default="scope">
						<el-tag v-if="scope.row.userType == 1">会员</el-tag>
						<el-tag v-if="scope.row.userType == 2">管理员</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="userId" label="用户编号" align="center" />
				<el-table-column prop="templateCode" label="模版编码" align="center" show-overflow-tooltip />
				<el-table-column prop="templateNickname" label="发送人名称" align="center" show-overflow-tooltip />
				<el-table-column prop="templateContent" label="模版内容" show-overflow-tooltip />
				<el-table-column prop="templateParams" label="模版参数" show-overflow-tooltip />
				<el-table-column prop="templateType" label="模版类型" align="center" width="160">
					<template #default="scope">
						<el-tag v-if="scope.row.templateType == 2" type="success">系统消息</el-tag>
						<el-tag v-if="scope.row.templateType == 1" type="warning">通知公告</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="readStatus" label="是否已读" align="center" width="160">
					<template #default="scope">
						<el-tag v-if="scope.row.readStatus == true" type="success">是</el-tag>
						<el-tag v-if="scope.row.readStatus == false" type="danger">否</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="readTime" label="阅读时间" align="center" width="140" />
				<el-table-column prop="createTime" label="操作时间" align="center" width="140" />
				<el-table-column label="操作" fixed="right" align="center" width="100">
					<template #default="scope">
						<el-button type="primary" link @click="info(scope.row)">详情</el-button>
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
			<el-descriptions :column="1" size="small" border>
				<el-descriptions-item label="操作编号" width="80px">{{ dialogData.id }}</el-descriptions-item>
				<el-descriptions-item label="用户类型">
					<el-tag v-if="dialogData.userType == 2" type="success">管理员</el-tag>
					<el-tag v-if="dialogData.userType == 1" type="danger">会员</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="用户编号">{{ dialogData.userId }}</el-descriptions-item>
				<el-descriptions-item label="模版编号">{{ dialogData.templateId }}</el-descriptions-item>
				<el-descriptions-item label="模板编码">{{ dialogData.templateCode }}</el-descriptions-item>
				<el-descriptions-item label="发送人名称">{{ dialogData.templateNickname }}</el-descriptions-item>
				<el-descriptions-item label="模版内容">{{ dialogData.templateContent }}</el-descriptions-item>
				<el-descriptions-item label="模版参数">{{ dialogData.templateParams }}</el-descriptions-item>
				<el-descriptions-item label="模版类型">
					<el-tag v-if="dialogData.templateType == 2" type="success">系统消息</el-tag>
					<el-tag v-if="dialogData.templateType == 1" type="warning">通知公告</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="模版类型">
					<el-tag v-if="dialogData.readStatus == true" type="success">是</el-tag>
					<el-tag v-if="dialogData.readStatus == false" type="danger">否</el-tag>
				</el-descriptions-item>
				<el-descriptions-item label="阅读时间">{{ dialogData.readTime }}</el-descriptions-item>
				<el-descriptions-item label="创建时间">{{ dialogData.createTime }}</el-descriptions-item>
			</el-descriptions>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss"></style>
