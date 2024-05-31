<script setup lang="ts">
import { ref ,reactive} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';

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

// 表格数据
const tableData = reactive([
    {
        "type": 2,
        "status": 0,
        "code": "demo",
        "name": "演示模板",
        "content": "我就是测试一下下",
        "remark": null,
        "apiTemplateId": "biubiubiu",
        "channelId": 6,
        "id": 12,
        "channelCode": "DEBUG_DING_TALK",
        "params": [],
        "createTime": 1649604169000
    },
    {
        "type": 2,
        "status": 0,
        "code": "bpm_process_instance_approve",
        "name": "【工作流】流程被通过",
        "content": "您的流程被审批通过：{processInstanceName}，查看链接：{detailUrl}",
        "remark": null,
        "apiTemplateId": "suibian",
        "channelId": 4,
        "id": 11,
        "channelCode": "DEBUG_DING_TALK",
        "params": [
            "processInstanceName",
            "detailUrl"
        ],
        "createTime": 1642781071000
    },
    {
        "type": 2,
        "status": 0,
        "code": "bpm_process_instance_reject",
        "name": "【工作流】流程被不通过",
        "content": "您的流程被审批不通过：{processInstanceName}，原因：{reason}，查看链接：{detailUrl}",
        "remark": null,
        "apiTemplateId": "suibian",
        "channelId": 4,
        "id": 10,
        "channelCode": "DEBUG_DING_TALK",
        "params": [
            "processInstanceName",
            "reason",
            "detailUrl"
        ],
        "createTime": 1642781011000
    },
    {
        "type": 2,
        "status": 0,
        "code": "bpm_task_assigned",
        "name": "【工作流】任务被分配",
        "content": "您收到了一条新的待办任务：{processInstanceName}-{taskName}，申请人：{startUserNickname}，处理链接：{detailUrl}",
        "remark": null,
        "apiTemplateId": "suibian",
        "channelId": 4,
        "id": 9,
        "channelCode": "DEBUG_DING_TALK",
        "params": [
            "processInstanceName",
            "taskName",
            "startUserNickname",
            "detailUrl"
        ],
        "createTime": 1642775479000
    },
    {
        "type": 1,
        "status": 0,
        "code": "user-sms-login",
        "name": "前台用户短信登录",
        "content": "您的验证码是{code}",
        "remark": null,
        "apiTemplateId": "4372216",
        "channelId": 6,
        "id": 8,
        "channelCode": "DEBUG_DING_TALK",
        "params": [
            "code"
        ],
        "createTime": 1633911000000
    },
    {
        "type": 3,
        "status": 0,
        "code": "test-04",
        "name": "测试下",
        "content": "老鸡{name}，牛逼{code}",
        "remark": null,
        "apiTemplateId": "suibian",
        "channelId": 4,
        "id": 7,
        "channelCode": "DEBUG_DING_TALK",
        "params": [
            "name",
            "code"
        ],
        "createTime": 1618244993000
    },
    {
        "type": 3,
        "status": 0,
        "code": "test-01",
        "name": "测试模板",
        "content": "哈哈哈 {name}",
        "remark": "f哈哈哈",
        "apiTemplateId": "4383920",
        "channelId": 6,
        "id": 6,
        "channelCode": "DEBUG_DING_TALK",
        "params": [
            "name"
        ],
        "createTime": 1617988041000
    },
    {
        "type": 1,
        "status": 0,
        "code": "test_02",
        "name": "公告通知",
        "content": "您的验证码{code}，该验证码5分钟内有效，请勿泄漏于他人！",
        "remark": null,
        "apiTemplateId": "SMS_207945135",
        "channelId": 2,
        "id": 3,
        "channelCode": "ALIYUN",
        "params": [
            "code"
        ],
        "createTime": 1617162990000
    },
    {
        "type": 1,
        "status": 0,
        "code": "test_01",
        "name": "测试验证码短信",
        "content": "正在进行登录操作{operation}，您的验证码是{code}",
        "remark": null,
        "apiTemplateId": "4383920",
        "channelId": 6,
        "id": 2,
        "channelCode": "DEBUG_DING_TALK",
        "params": [
            "operation",
            "code"
        ],
        "createTime": 1617158978000
    }
])
// 编辑
const edit = row => {
	smsForm = row
	dialogVisible.value = true
};
// 测试
const test = row => {
	testDialogVisible.value = true
};
//搜索
const searchFormRef = ref<FormInstance>()
let searchForm = reactive({
 type: null,
 status: null,
 code: null,
 apiTemplateId: null,
 channelCode: null,
 createTime: '',
})
const value1 = ref<[Date, Date]>([
  new Date(2000, 10, 10, 10, 10),
  new Date(2000, 10, 11, 10, 10),
])
const resetSearchForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
	searchForm = reactive({
 type: null,
 status: null,
 code: null,
 apiTemplateId: null,
 channelCode: null,
 createTime: '',
})
  formEl.resetFields()
}
// 修改对话框
const dialogVisible = ref(false)
const closeDialog = ()=>{
	dialogVisible.value = false
	console.log('closeDialog');
	smsForm = reactive({})
	smsFormRef.value.resetFields()
}
// 修改对话框表单
import type { FormInstance, FormRules } from 'element-plus'
const smsFormRef = ref<FormInstance>()
let smsForm = reactive({
  id: null,
  type: null,
  status: null,
  code: null,
  name: null,
  remark: null,
  apiTemplateId: null,
  channelId: null,
  params: null,
  createTime: null
})
const smsRules = reactive<FormRules>({
	channelCode: [
	    { required: true, message: '请输入短信渠道编号', trigger: 'blur' },
	],
	type: [
	    { required: true, message: '请输入短信类型', trigger: 'blur' },
	],
	code: [
	    { required: true, message: '请输入模版编号', trigger: 'blur' },
	],
	name: [
	    { required: true, message: '请输入模版名称', trigger: 'blur' },
	],
	content: [
	    { required: true, message: '请输入模版内容', trigger: 'blur' },
	],
	status: [
	  { required: true, message: '请输选择启用状态', trigger: 'blur' },
	],
	apiTemplateId: [
	  { required: true, message: '请输入短信api模版编号', trigger: 'blur' },
	],
})
const submitDictForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    }
  })
}

// 测试对话框
const testDialogVisible = ref(false)
const closeTsteDialog = ()=>{
	testDialogVisible.value = false
	console.log('closeTsteDialog');
	// smsForm = reactive({})
	// smsFormRef.value.resetFields()
}
const testFormRef = ref<FormInstance>()
let testForm = reactive({
  content: null,
  mobile: null
})
const testRules = reactive<FormRules>({
	mobile: [
	    { required: true, message: '请输入手机号码', trigger: 'blur' },
	],
	content: [
	    { required: true, message: '请输入模版内容', trigger: 'blur' },
	],
})
</script>
<template>
	<div class="container">
		<!-- 搜索 -->
		<el-card class="box-card">
			<el-form ref="searchFormRef" :model="searchForm" label-width="80px" status-icon>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="短信类型">
							<el-select v-model="searchForm.type" clearable placeholder="请选择状态">
								<el-option label="营销" value="3" />
								<el-option label="验证码" value="1" />
								<el-option label="通知" value="2" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="启用状态">
							<el-select v-model="searchForm.status" clearable placeholder="请选择状态">
								<el-option label="开启" :value="true" />
								<el-option label="关闭" :value="false" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="模版编码"><el-input v-model="searchForm.code" placeholder="请输入模版编码" /></el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="短信api模版编号"><el-input v-model="searchForm.apiTemplateId" placeholder="请输入短信api模版编号" /></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="短信渠道">
							<el-select v-model="searchForm.channelCode" clearable placeholder="请选择短信渠道">
								<el-option label="钉钉" value="DEBUG_DING_TALK" />
								<el-option label="阿里云" value="ALIYUN" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="创建时间">
							<el-date-picker v-model="searchForm.date" type="datetimerange" clearable range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
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
					<el-button icon="Plus" type="primary" plain>新增</el-button>
					<el-button icon="EditPen" type="success" plain :disabled="delBtnDisabled">修改</el-button>
					<el-button icon="Delete" type="danger" plain :disabled="delBtnDisabled" @click="del([])">删除</el-button>
					<el-button icon="Bottom" type="info" plain>导出</el-button>
				</div>
				<div>
					<el-tooltip class="box-item" effect="light" content="隐藏/显示 搜索" placement="top"><el-button icon="Search" circle></el-button></el-tooltip>
					<el-tooltip class="box-item" effect="light" content="刷新" placement="top"><el-button icon="Refresh" circle></el-button></el-tooltip>
				</div>
			</div>
			<el-table :data="tableData" style="width: 100%" @selection-change="selectable">
				<el-table-column align="center" width="40px" type="selection" />
				<el-table-column prop="id" label="编号" align="center" width="40px" />
				<el-table-column prop="code" label="模版编码" align="center" show-overflow-tooltip />
				<el-table-column prop="name" label="模版名称" show-overflow-tooltip />
				<el-table-column prop="content" label="模版内容" show-overflow-tooltip />
				<el-table-column prop="type" label="短信类型">
					<template #default="scope">
						<el-tag v-if="scope.row.type ==2 ">通知</el-tag>
						<el-tag v-if="scope.row.type ==3 ">营销</el-tag>
						<el-tag v-if="scope.row.type ==1 ">验证码</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="status" label="启用状态">
					<template #default="scope">
						<el-tag v-if="scope.row.status == 0">开启</el-tag>
						<el-tag v-else type="info">关闭</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="备注" show-overflow-tooltip />
				<el-table-column prop="apiTemplateId" label="短信api的模版编号" show-overflow-tooltip />
				<el-table-column prop="channelCode" label="短信渠道">
					<template #default="scope">
						<el-tag>钉钉</el-tag>
						<el-tag>阿里云</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center" width="140" />
				<el-table-column label="操作" fixed="right" align="center" width="140">
					<template #default="scope">
						<el-button type="primary" link @click="edit(scope.row)">编辑</el-button>
						<el-button type="primary" link @click="test(scope.row)">测试</el-button>
						<el-button type="danger" link @click="del([scope.row.id])">删除</el-button>
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
		<el-dialog v-model="dialogVisible" title="编辑" draggable @close="closeDialog">
			<el-form ref="smsFormRef" :model="smsForm" :rules="smsRules" label-width="80px" status-icon>
				<el-form-item label="短信渠道编号" prop="channelCode">
					<el-select v-model="smsForm.channelCode" clearable placeholder="请选择短信渠道编码">
						<el-option label="钉钉" value="DEBUG_DING_TALK" />
						<el-option label="阿里云" value="ALIYUN" />
					</el-select>
				</el-form-item>
				<el-form-item label="短信类型" prop="type">
					<el-select v-model="smsForm.type" clearable placeholder="请选择短信类型">
						<el-option label="验证码" value="1" />
						<el-option label="通知" value="2" />
						<el-option label="营销" value="3" />
					</el-select>
				</el-form-item>
				<el-form-item label="模版编号" prop="code"><el-input v-model="smsForm.code" placeholder="请输入模版编号" /></el-form-item>
				<el-form-item label="模版名称" prop="name"><el-input v-model="smsForm.name" placeholder="请输入模版名称" /></el-form-item>
				<el-form-item label="模版内容" prop="content"><el-input v-model="smsForm.content" placeholder="请输入模版内容" /></el-form-item>
				<el-form-item label="启用状态" prop="status">
					<el-radio-group v-model="smsForm.status">
						<el-radio :label="true">开启</el-radio>
						<el-radio :label="false">关闭</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="短信api模版编号" prop="apiTemplateId"><el-input v-model="smsForm.apiTemplateId" placeholder="请输入短信api模版编号" /></el-form-item>
				<el-form-item label="备注"><el-input v-model="smsForm.remark" type="textarea" placeholder="请输入备注" /></el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="submitDictForm(smsFormRef)">确定</el-button>
					<el-button @click="closeDialog">取消</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 测试对话框 -->
		<el-dialog v-model="testDialogVisible" title="编辑" draggable @close="closeTsteDialog">
			<el-form ref="testFormRef" :model="testForm" :rules="testRules" label-width="80px" status-icon>
				<el-form-item label="模版内容" prop="content"><el-input v-model="smsForm.content" type="textarea" placeholder="请输入模版内容" /></el-form-item>
				<el-form-item label="手机号码" prop="mobile"><el-input v-model="smsForm.mobile" placeholder="请输入手机号码" /></el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="submitDictForm(testFormRef)">确定</el-button>
					<el-button @click="closeTsteDialog">取消</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss"></style>
