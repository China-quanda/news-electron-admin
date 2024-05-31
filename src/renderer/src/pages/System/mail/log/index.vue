<script setup lang="ts">
import { ref ,reactive ,computed} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
// 表格数据
const tableData = reactive([
  {
    "userId": null,
    "userType": 2,
    "toMail": "7685413@qq.com",
    "accountId": 2,
    "fromMail": "ydym_test@163.com",
    "templateId": 14,
    "templateCode": "test_01",
    "templateNickname": "芋艿",
    "templateTitle": "一个标题",
    "templateContent": "<p>你是 aoteman 吗？</p><p><br></p><p>是的话，赶紧 binshen 一下！</p>",
    "templateParams": {
      "key01": "aoteman",
      "key02": "binshen"
    },
    "sendStatus": 10,
    "sendTime": 1674781039000,
    "sendMessageId": "<1627322404.5.1674809837932@[192.168.24.165]>",
    "sendException": null,
    "id": 353,
    "createTime": 1674809838000
  },
  {
    "userId": null,
    "userType": 2,
    "toMail": "7685413@qq.com",
    "accountId": 2,
    "fromMail": "ydym_test@163.com",
    "templateId": 14,
    "templateCode": "test_01",
    "templateNickname": "芋艿",
    "templateTitle": "一个标题",
    "templateContent": "<p>你是 奥特曼 吗？</p><p><br></p><p>是的话，赶紧 变身 一下！</p>",
    "templateParams": {
      "key01": "奥特曼",
      "key02": "变身"
    },
    "sendStatus": 10,
    "sendTime": 1674765733000,
    "sendMessageId": "<1293807391.3.1674794529066@[192.168.24.165]>",
    "sendException": null,
    "id": 352,
    "createTime": 1674794529000
  },
  {
    "userId": null,
    "userType": 2,
    "toMail": "7685413@qq.com",
    "accountId": 2,
    "fromMail": "ydym_test@163.com",
    "templateId": 14,
    "templateCode": "test_01",
    "templateNickname": "芋艿",
    "templateTitle": "一个标题",
    "templateContent": "<p>你是 奥特曼 吗？</p><p><br></p><p>是的话，赶紧 写代码 一下！</p>",
    "templateParams": {
      "key01": "奥特曼",
      "key02": "写代码"
    },
    "sendStatus": 10,
    "sendTime": 1674765371000,
    "sendMessageId": "<664060010.1.1674794168918@[192.168.24.165]>",
    "sendException": null,
    "id": 351,
    "createTime": 1674794169000
  },
  {
    "userId": null,
    "userType": 2,
    "toMail": "7685413@qq.com",
    "accountId": 2,
    "fromMail": "ydym_test@163.com",
    "templateId": 14,
    "templateCode": "test_01",
    "templateNickname": null,
    "templateTitle": "一个标题",
    "templateContent": "<p>你是 aoteman 吗？</p><p><br></p><p>是的话，赶紧 土豆 一下！</p>",
    "templateParams": {
      "key01": "aoteman",
      "key02": "土豆"
    },
    "sendStatus": 10,
    "sendTime": 1674718251000,
    "sendMessageId": "<468833078.1.1674747048822@[192.168.31.238]>",
    "sendException": null,
    "id": 350,
    "createTime": 1674747049000
  },
  {
    "userId": null,
    "userType": 2,
    "toMail": "7685413@qq.com",
    "accountId": 2,
    "fromMail": "ydym_test@163.com",
    "templateId": 14,
    "templateCode": "test_01",
    "templateNickname": null,
    "templateTitle": "一个标题",
    "templateContent": "<p>你是 value01 吗？</p><p><br></p><p>是的话，赶紧 value02 一下！</p>",
    "templateParams": {
      "key01": "value01",
      "key02": "value02"
    },
    "sendStatus": 10,
    "sendTime": 1674666530000,
    "sendMessageId": "<590091956.7.1674695329137@[192.168.31.185]>",
    "sendException": null,
    "id": 349,
    "createTime": 1674695329000
  },
  {
    "userId": null,
    "userType": 2,
    "toMail": "7685413@qq.com",
    "accountId": 1,
    "fromMail": "7684413@qq.com",
    "templateId": 14,
    "templateCode": "test_01",
    "templateNickname": null,
    "templateTitle": "一个标题",
    "templateContent": "<p>你是 value01 吗？</p><p><br></p><p>是的话，赶紧 value02 一下！</p>",
    "templateParams": {
      "key01": "value01",
      "key02": "value02"
    },
    "sendStatus": 20,
    "sendTime": 1674666470000,
    "sendMessageId": null,
    "sendException": "ConnectException: Connection refused (Connection refused)",
    "id": 348,
    "createTime": 1674695247000
  },
  {
    "userId": null,
    "userType": 2,
    "toMail": "7685413@qq.com",
    "accountId": 1,
    "fromMail": "7684413@qq.com",
    "templateId": 14,
    "templateCode": "test_01",
    "templateNickname": null,
    "templateTitle": "一个标题",
    "templateContent": "<p>你是 value01 吗？</p><p><br></p><p>是的话，赶紧 value02 一下！</p>",
    "templateParams": {
      "key01": "value01",
      "key02": "value02"
    },
    "sendStatus": 20,
    "sendTime": 1674666337000,
    "sendMessageId": null,
    "sendException": "ConnectException: Connection refused (Connection refused)",
    "id": 347,
    "createTime": 1674695137000
  }
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
 sendTime: null,
 accountId: null,
 sendStatus: null,
 userType: null,
 userId: null,
 templateId: null,
})
const value1 = ref<[Date, Date]>([
  new Date(2000, 10, 10, 10, 10),
  new Date(2000, 10, 11, 10, 10),
])
const resetSearchForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
	searchForm = reactive({
  sendTime: null,
  accountId: null,
  sendStatus: null,
  userType: null,
  userId: null,
  templateId: null,
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
						<el-form-item label="模版编号"><el-input v-model="searchForm.templateId" placeholder="请输入模版编号"/></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="用户编号"><el-input v-model="searchForm.userId" placeholder="请输入用户编号"/></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="用户类型">
							<el-select v-model="searchForm.userType" clearable placeholder="请选择用户类型">
								<el-option label="全部" :value="0" />
								<el-option label="会员" :value="1" />
								<el-option label="管理员" :value="2" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="发送状态">
							<el-select v-model="searchForm.sendStatus" clearable placeholder="请选择发送状态" >
								<el-option label="发送成功" :value="10" />
								<el-option label="发送失败" :value="20" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="邮箱账号">
							<el-select v-model="searchForm.accountId" clearable placeholder="请选择邮箱账号" >
								<el-option label="7685413@qq.com" value="7685413@qq.com" />
								<el-option label="ydym_test@163.com" value="ydym_test@163.com" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="发送时间">
							<el-date-picker v-model="searchForm.sendTime" type="datetimerange" clearable  range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
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
				<el-table-column prop="sendTime" label="发送时间" align="center" show-overflow-tooltip/>
				<el-table-column prop="toMail" label="接收邮箱" align="center" show-overflow-tooltip/>
				<el-table-column prop="templateTitle" label="邮件标题" align="center" show-overflow-tooltip/>
				<el-table-column prop="sendStatus" label="发送状态">
					<template #default="scope">
						<el-tag v-if="scope.row.sendStatus == 10" type="success">发送成功</el-tag>
						<el-tag v-if="scope.row.sendStatus == 20" type="danger">发送失败</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="fromMail" label="发送邮箱地址" show-overflow-tooltip />
				<el-table-column prop="templateId" label="模版编号" show-overflow-tooltip />
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
			    <el-descriptions-item label="编号" width="80px">{{dialogData.id}}</el-descriptions-item>
			    <el-descriptions-item label="发送时间" >{{dialogData.sendTime}}</el-descriptions-item>
			    <el-descriptions-item label="接收邮箱" >{{dialogData.toMail}}</el-descriptions-item>
			    <el-descriptions-item label="用户编号" >{{dialogData.userId}}</el-descriptions-item>
			    <el-descriptions-item label="用户类型" >{{dialogData.userType}}</el-descriptions-item>
					<el-descriptions-item label="邮件标题" >{{dialogData.templateTitle}}</el-descriptions-item>
			    <el-descriptions-item label="邮件内容" >{{dialogData.templateContent}}</el-descriptions-item>
			    <el-descriptions-item label="邮箱参数" >{{dialogData.templateParams}}</el-descriptions-item>
			    <el-descriptions-item label="发送状态" >
						<el-tag v-if="dialogData.sendStatus == 10" type="success">发送成功</el-tag>
						<el-tag v-if="dialogData.sendStatus == 20" type="danger">发送失败</el-tag>
					</el-descriptions-item>
			    <el-descriptions-item label="邮箱账号" >{{dialogData.accountId}}</el-descriptions-item>
			    <el-descriptions-item label="发送邮箱地址" >{{dialogData.fromMail}}</el-descriptions-item>
			    <el-descriptions-item label="模版编号" >{{dialogData.templateId}}</el-descriptions-item>
			    <el-descriptions-item label="模版编码" >{{dialogData.templateCode}}</el-descriptions-item>
			    <el-descriptions-item label="模版发送人名称" >{{dialogData.templateNickname}}</el-descriptions-item>
			    <el-descriptions-item label="发送返回的消息编号" >{{dialogData.sendMessageId}}</el-descriptions-item>
			    <el-descriptions-item label="发送异常	" >{{dialogData.sendException}}</el-descriptions-item>
			    <el-descriptions-item label="操作时间" >{{dialogData.createTime}}</el-descriptions-item>
			  </el-descriptions>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss"></style>
