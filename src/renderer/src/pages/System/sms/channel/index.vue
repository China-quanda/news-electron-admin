<script setup lang="ts">
import { ref ,reactive} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
// 表格数据
const tableData = reactive([
	{
		id: 1,
		signature: '测试演示',
		code :  "DEBUG_DING_TALK",
		apiKey :  "696b5d8ead48071237e4aa5861ff08dbadb2b4ded1c688a7b7c9afc615579859",
		apiSecret :  "SEC5c4e5ff888bc8a9923ae47f59e7ccd30af1f14d93c55b4e2c9cb094e35aeed67",
		callbackUrl :  null,
		remark: null,
		status:true,
		createTime: '2023-05-20 20:30:50'
	},
	{
		id: 1,
		signature: '测试演示',
		code :  "DEBUG_DING_TALK",
		apiKey :  "696b5d8ead48071237e4aa5861ff08dbadb2b4ded1c688a7b7c9afc615579859",
		apiSecret :  "SEC5c4e5ff888bc8a9923ae47f59e7ccd30af1f14d93c55b4e2c9cb094e35aeed67",
		callbackUrl :  null,
		remark: null,
		status:true,
		createTime: '2023-05-20 20:30:50'
	},
	{
		id: 1,
		signature: 'Ballcat',
		code :  "ALIYUN",
		apiKey :  "LTAI5tCnKso2uG3kJ5gRav88",
		apiSecret :  "fGJ5SNXL7P1NHNRmJ7DJaMJGPyE55C",
		callbackUrl :  null,
		remark: '啦啦啦',
		status:true,
		createTime: '2023-05-20 20:30:50'
	},

])
// 编辑
const edit = row => {
	smsForm = row
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
 signature: null,
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
  signature: null,
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
	smsForm = reactive({})
	smsFormRef.value.resetFields()
}

// 对话框表单
import type { FormInstance, FormRules } from 'element-plus'
const smsFormRef = ref<FormInstance>()
let smsForm = reactive({
  id: null,
  signature: null,
  code: null,
  apiKey: null,
  apiSecret: null,
	callbackUrl :  null,
  remark: null,
  status:null,
  createTime: null
})
const smsRules = reactive<FormRules>({
	signature: [
	    { required: true, message: '请输入短信签名', trigger: 'blur' },
	],
	code: [
	    { required: true, message: '请选择渠道编码', trigger: 'blur' },
	],
	apiKey: [
	  { required: true, message: '请输入短信api的账号', trigger: 'blur' },
	],
	apiSecret: [
	  { required: true, message: '请输入短信api的密钥', trigger: 'blur' },
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
</script>
<template>
	<div class="container">
		<!-- 搜索 -->
		<el-card class="box-card">
			<el-form ref="searchFormRef" :model="searchForm" label-width="80px" status-icon>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="短信签名"><el-input v-model="searchForm.signature" placeholder="请输入短信签名" /></el-form-item>
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
				<el-table-column prop="signature" label="短信签名" align="center" show-overflow-tooltip />
				<el-table-column prop="code" label="渠道编码" show-overflow-tooltip />
				<el-table-column prop="status" label="启用状态">
					<template #default="scope">
						<el-tag v-if="scope.row.status">开启</el-tag>
						<el-tag v-else type="info">关闭</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="备注" show-overflow-tooltip />
				<el-table-column prop="apiKey" label="短信api的账号" show-overflow-tooltip />
				<el-table-column prop="apiSecret" label="短信api的密钥" show-overflow-tooltip />
				<el-table-column prop="callbackUrl" label="短信发送回调的URL" show-overflow-tooltip />
				<el-table-column prop="createTime" label="创建时间" align="center" width="140" />
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
				<el-form-item label="短信签名" prop="signature"><el-input v-model="smsForm.signature" placeholder="请输入短信签名" /></el-form-item>
				<el-form-item label="渠道编码" prop="code">
					<el-select v-model="smsForm.code" clearable placeholder="请选择渠道编码">
						<el-option label="钉钉" value="DEBUG_DING_TALK" />
						<el-option label="阿里云" value="ALIYUN" />
					</el-select>
				</el-form-item>
				<el-form-item label="启用状态">
					<el-radio-group v-model="smsForm.status">
						<el-radio :label="true">开启</el-radio>
						<el-radio :label="false">关闭</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="备注"><el-input v-model="smsForm.remark" type="textarea" placeholder="请输入备注" /></el-form-item>
				<el-form-item label="短信api的账号" prop="apiKey"><el-input v-model="smsForm.apiKey" placeholder="请输入短信api的账号" /></el-form-item>
				<el-form-item label="短信api的密钥" prop="apiSecret"><el-input v-model="smsForm.apiSecret" placeholder="请输入短信api的密钥" /></el-form-item>
				<el-form-item label="短信发送回调的url"><el-input v-model="smsForm.callbackUrl" placeholder="请输入短信发送回调的url" /></el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="submitDictForm(smsFormRef)">确定</el-button>
					<el-button @click="closeDialog">取消</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss"></style>
