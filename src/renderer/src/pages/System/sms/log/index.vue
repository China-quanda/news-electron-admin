<script setup lang="ts">
import { ref ,reactive ,computed} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
// 表格数据
const tableData = reactive([
  {
    "id": 379,
    "channelId": 6,
    "channelCode": "DEBUG_DING_TALK",
    "templateId": 8,
    "templateCode": "user-sms-login",
    "templateType": 1,
    "templateContent": "您的验证码是9999",
    "templateParams": {
      "code": "9999"
    },
    "apiTemplateId": "4372216",
    "mobile": "13812231330",
    "userId": null,
    "userType": null,
    "sendStatus": 10,
    "sendTime": 1686287604000,
    "sendCode": 0,
    "sendMsg": "成功",
    "apiSendCode": "0",
    "apiSendMsg": null,
    "apiRequestId": null,
    "apiSerialNo": "94774412-2dd6-455b-aa21-8b52dc1d9c73",
    "receiveStatus": 0,
    "receiveTime": null,
    "apiReceiveCode": null,
    "apiReceiveMsg": null,
    "createTime": 1686287603000
  },
  {
    "id": 378,
    "channelId": 6,
    "channelCode": "DEBUG_DING_TALK",
    "templateId": 8,
    "templateCode": "user-sms-login",
    "templateType": 1,
    "templateContent": "您的验证码是9999",
    "templateParams": {
      "code": "9999"
    },
    "apiTemplateId": "4372216",
    "mobile": "18251676968",
    "userId": null,
    "userType": null,
    "sendStatus": 20,
    "sendTime": 1686034865000,
    "sendCode": 2001000000,
    "sendMsg": "未知错误，需要解析",
    "apiSendCode": "130101",
    "apiSendMsg": null,
    "apiRequestId": null,
    "apiSerialNo": "b5614ffc-2eb5-4622-a3ba-d62ec6920c53",
    "receiveStatus": 0,
    "receiveTime": null,
    "apiReceiveCode": null,
    "apiReceiveMsg": null,
    "createTime": 1686034864000
  },
  {
    "id": 377,
    "channelId": 6,
    "channelCode": "DEBUG_DING_TALK",
    "templateId": 8,
    "templateCode": "user-sms-login",
    "templateType": 1,
    "templateContent": "您的验证码是9999",
    "templateParams": {
      "code": "9999"
    },
    "apiTemplateId": "4372216",
    "mobile": "17639526288",
    "userId": null,
    "userType": null,
    "sendStatus": 10,
    "sendTime": 1686022763000,
    "sendCode": 0,
    "sendMsg": "成功",
    "apiSendCode": "0",
    "apiSendMsg": null,
    "apiRequestId": null,
    "apiSerialNo": "739b11ac-091f-4b3d-ad28-76e8e4611b19",
    "receiveStatus": 0,
    "receiveTime": null,
    "apiReceiveCode": null,
    "apiReceiveMsg": null,
    "createTime": 1686022762000
  },
  {
    "id": 376,
    "channelId": 6,
    "channelCode": "DEBUG_DING_TALK",
    "templateId": 8,
    "templateCode": "user-sms-login",
    "templateType": 1,
    "templateContent": "您的验证码是9999",
    "templateParams": {
      "code": "9999"
    },
    "apiTemplateId": "4372216",
    "mobile": "15130637272",
    "userId": null,
    "userType": null,
    "sendStatus": 10,
    "sendTime": 1685951209000,
    "sendCode": 0,
    "sendMsg": "成功",
    "apiSendCode": "0",
    "apiSendMsg": null,
    "apiRequestId": null,
    "apiSerialNo": "fb97c07d-7d15-4077-a9fb-df6ebe9afdfd",
    "receiveStatus": 0,
    "receiveTime": null,
    "apiReceiveCode": null,
    "apiReceiveMsg": null,
    "createTime": 1685951209000
  },
  {
    "id": 375,
    "channelId": 6,
    "channelCode": "DEBUG_DING_TALK",
    "templateId": 8,
    "templateCode": "user-sms-login",
    "templateType": 1,
    "templateContent": "您的验证码是9999",
    "templateParams": {
      "code": "9999"
    },
    "apiTemplateId": "4372216",
    "mobile": "18439914726",
    "userId": null,
    "userType": null,
    "sendStatus": 10,
    "sendTime": 1685931409000,
    "sendCode": 0,
    "sendMsg": "成功",
    "apiSendCode": "0",
    "apiSendMsg": null,
    "apiRequestId": null,
    "apiSerialNo": "7e34aaa8-379f-4faa-8cc1-d874d421e981",
    "receiveStatus": 0,
    "receiveTime": null,
    "apiReceiveCode": null,
    "apiReceiveMsg": null,
    "createTime": 1685931409000
  },
  {
    "id": 374,
    "channelId": 6,
    "channelCode": "DEBUG_DING_TALK",
    "templateId": 8,
    "templateCode": "user-sms-login",
    "templateType": 1,
    "templateContent": "您的验证码是9999",
    "templateParams": {
      "code": "9999"
    },
    "apiTemplateId": "4372216",
    "mobile": "18862317406",
    "userId": null,
    "userType": null,
    "sendStatus": 20,
    "sendTime": 1685607995000,
    "sendCode": 2001000000,
    "sendMsg": "未知错误，需要解析",
    "apiSendCode": "130101",
    "apiSendMsg": null,
    "apiRequestId": null,
    "apiSerialNo": "5545fd3e-c2c0-482f-81f3-bdc08fe166ed",
    "receiveStatus": 0,
    "receiveTime": null,
    "apiReceiveCode": null,
    "apiReceiveMsg": null,
    "createTime": 1685607995000
  },
  {
    "id": 373,
    "channelId": 6,
    "channelCode": "DEBUG_DING_TALK",
    "templateId": 8,
    "templateCode": "user-sms-login",
    "templateType": 1,
    "templateContent": "您的验证码是9999",
    "templateParams": {
      "code": "9999"
    },
    "apiTemplateId": "4372216",
    "mobile": "13950311430",
    "userId": null,
    "userType": null,
    "sendStatus": 10,
    "sendTime": 1685591877000,
    "sendCode": 0,
    "sendMsg": "成功",
    "apiSendCode": "0",
    "apiSendMsg": null,
    "apiRequestId": null,
    "apiSerialNo": "e0cbc31b-bc0c-40e4-bd49-121668eeb393",
    "receiveStatus": 0,
    "receiveTime": null,
    "apiReceiveCode": null,
    "apiReceiveMsg": null,
    "createTime": 1685591877000
  },
  {
    "id": 372,
    "channelId": 6,
    "channelCode": "DEBUG_DING_TALK",
    "templateId": 8,
    "templateCode": "user-sms-login",
    "templateType": 1,
    "templateContent": "您的验证码是9999",
    "templateParams": {
      "code": "9999"
    },
    "apiTemplateId": "4372216",
    "mobile": "17506391130",
    "userId": null,
    "userType": null,
    "sendStatus": 20,
    "sendTime": 1685589741000,
    "sendCode": 2001000000,
    "sendMsg": "未知错误，需要解析",
    "apiSendCode": "130101",
    "apiSendMsg": null,
    "apiRequestId": null,
    "apiSerialNo": "4d84d70b-1bc1-4d09-b31c-07ca2e293ee4",
    "receiveStatus": 0,
    "receiveTime": null,
    "apiReceiveCode": null,
    "apiReceiveMsg": null,
    "createTime": 1685589740000
  },
  {
    "id": 371,
    "channelId": 6,
    "channelCode": "DEBUG_DING_TALK",
    "templateId": 8,
    "templateCode": "user-sms-login",
    "templateType": 1,
    "templateContent": "您的验证码是9999",
    "templateParams": {
      "code": "9999"
    },
    "apiTemplateId": "4372216",
    "mobile": "17506391132",
    "userId": null,
    "userType": null,
    "sendStatus": 20,
    "sendTime": 1685589662000,
    "sendCode": 2001000000,
    "sendMsg": "未知错误，需要解析",
    "apiSendCode": "130101",
    "apiSendMsg": null,
    "apiRequestId": null,
    "apiSerialNo": "10781345-2e91-47e4-a4bb-89713b2cb30c",
    "receiveStatus": 0,
    "receiveTime": null,
    "apiReceiveCode": null,
    "apiReceiveMsg": null,
    "createTime": 1685589662000
  },
  {
    "id": 370,
    "channelId": 6,
    "channelCode": "DEBUG_DING_TALK",
    "templateId": 8,
    "templateCode": "user-sms-login",
    "templateType": 1,
    "templateContent": "您的验证码是9999",
    "templateParams": {
      "code": "9999"
    },
    "apiTemplateId": "4372216",
    "mobile": "17506391130",
    "userId": null,
    "userType": null,
    "sendStatus": 20,
    "sendTime": 1685589627000,
    "sendCode": 2001000000,
    "sendMsg": "未知错误，需要解析",
    "apiSendCode": "130101",
    "apiSendMsg": null,
    "apiRequestId": null,
    "apiSerialNo": "d655a524-0a8a-4fb2-aa3d-e7068fcf893a",
    "receiveStatus": 0,
    "receiveTime": null,
    "apiReceiveCode": null,
    "apiReceiveMsg": null,
    "createTime": 1685589627000
  }
])
// 详情
const info = row => {
	dialogData = reactive(row)
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
 mobile: null,
 channelCode: null,
 templateId: [],
 receiveTime: null,
 sendStatus: '',
 receiveStatus: '',
 sendTime: '',
})
const value1 = ref<[Date, Date]>([
  new Date(2000, 10, 10, 10, 10),
  new Date(2000, 10, 11, 10, 10),
])
const resetSearchForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
	searchForm = reactive({
  mobile: null,
  channelCode: null,
  templateId: [],
  receiveTime: null,
  sendStatus: '',
  receiveStatus: '',
  sendTime: '',
})
  formEl.resetFields()
}
// 对话框
const dialogVisible = ref(false)
const closeDialog = ()=>{
	dialogVisible.value = false
	console.log('closeDialog');
	dialogData = reactive({})
}
// 描述信息
let dialogData = reactive({})
</script>

<template>
	<div class="container">
		<!-- 搜索 -->
		<el-card class="box-card">
			<el-form ref="searchFormRef" :model="searchForm" label-width="80px" status-icon>
				<el-row :gutter="24">
					<el-col :span="6">
						<el-form-item label="手机号码"><el-input v-model="searchForm.mobile" placeholder="请输入手机号码"/></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="短信渠道">
							<el-select v-model="searchForm.channelCode" clearable placeholder="请选择短信渠道编码">
								<el-option label="钉钉" value="DEBUG_DING_TALK" />
								<el-option label="阿里云" value="ALIYUN" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="模版编号"><el-input v-model="searchForm.templateId" placeholder="请输入模版编号"/></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="接收时间">
							<el-date-picker v-model="searchForm.receiveTime" type="datetimerange" clearable  range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="24">
					<el-col :span="6">
						<el-form-item label="发送状态">
							<el-select v-model="searchForm.sendStatus" clearable placeholder="请选择发送状态" >
								<el-option label="初始化" value="1" />
								<el-option label="发送成功" value="10" />
								<el-option label="发送失败" value="20" />
								<el-option label="不发送" value="4" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="接收状态">
							<el-select v-model="searchForm.receiveStatus" clearable placeholder="请选择接收状态" >
								<el-option label="等待结果" value="0" />
								<el-option label="接收成功" value="2" />
								<el-option label="接收失败" value="3" />
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
				<el-table-column prop="mobile" label="手机号" align="center" />
				<el-table-column prop="templateContent" label="短信内容" align="center" show-overflow-tooltip/>
				<el-table-column prop="sendStatus" label="发送状态" align="center">
					<template #default="scope">
						<el-tag v-if="scope.row.sendStatus == 1">初始化</el-tag>
						<el-tag v-if="scope.row.sendStatus == 10">发送成功</el-tag>
						<el-tag v-if="scope.row.sendStatus == 20">发送失败</el-tag>
						<el-tag v-if="scope.row.sendStatus == 4">不发送</el-tag>
						{{scope.row.sendTime}}
					</template>
				</el-table-column>
				<el-table-column prop="receiveStatus" label="接收状态" align="center" >
					<template #default="scope">
						<el-tag v-if="scope.row.receiveStatus == 0">等待结果</el-tag>
						<el-tag v-if="scope.row.receiveStatus == 2">接收成功</el-tag>
						<el-tag v-if="scope.row.receiveStatus == 3">接收失败</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="channelCode" label="短信渠道" align="center" >
					<template #default="scope">
						<el-tag v-if="scope.row.channelCode == 'DEBUG_DING_TALK'">钉钉</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="templateId" label="模版编号" />
				<el-table-column prop="templateType" label="短信类型" align="center" >
					<template #default="scope">
						<el-tag v-if="scope.row.templateType == 1">验证码</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center" />
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
			    <el-descriptions-item label="日志主键" width="80px">{{dialogData.id}}</el-descriptions-item>
			    <el-descriptions-item label="短信渠道" >{{dialogData.channelCode}}</el-descriptions-item>
			    <el-descriptions-item label="短信模版" >{{dialogData.templateId}} ｜ {{dialogData.templateCode}}</el-descriptions-item>
			    <el-descriptions-item label="api的编号" >{{dialogData.apiTemplateId}}</el-descriptions-item>
			    <el-descriptions-item label="用户信息" >{{dialogData.mobile}}</el-descriptions-item>
					<el-descriptions-item label="短信内容" >{{dialogData.templateContent}}</el-descriptions-item>
			    <el-descriptions-item label="短信参数" >{{dialogData.templateParams}}</el-descriptions-item>
			    <el-descriptions-item label="创建时间" >{{dialogData.createTime}}</el-descriptions-item>
			    <el-descriptions-item label="发送状态" >{{dialogData.sendStatus}}</el-descriptions-item>
			    <el-descriptions-item label="发送时间" >{{dialogData.sendTime}}</el-descriptions-item>
			    <el-descriptions-item label="发送结果" >{{dialogData.sendCode}} ｜ {{dialogData.sendMsg}}</el-descriptions-item>
			    <el-descriptions-item label="API 发送结果" >{{dialogData.apiSendCode}} ｜ {{dialogData.apiSendMsg}}</el-descriptions-item>
			    <el-descriptions-item label="短信API 编号" >{{dialogData.apiSerialNo}}</el-descriptions-item>
			    <el-descriptions-item label="API 请求编号" >{{dialogData.apiRequestId}}</el-descriptions-item>
			    <el-descriptions-item label="API 接收状态" >{{dialogData.receiveStatus}}</el-descriptions-item>
			    <el-descriptions-item label="API 接收结果" >{{dialogData.apiReceiveCode}} ｜ {{dialogData.apiReceiveMsg}}</el-descriptions-item>
			  </el-descriptions>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss"></style>
