<script setup lang="ts">
import { ref ,reactive} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
// 表格数据
const tableData = reactive([
  {
    "name": "注册通知",
    "code": "register",
    "type": 2,
    "nickname": "系统消息",
    "content": "你好，欢迎 {name} 加入大家庭！",
    "status": 0,
    "remark": null,
    "id": 2,
    "params": [
      "name"
    ],
    "createTime": 1674939644000
  },
  {
    "name": "测试1",
    "code": "test",
    "type": 1,
    "nickname": "123",
    "content": "我是 {name}，我开始 {what} 了",
    "status": 0,
    "remark": "12345",
    "id": 1,
    "params": [
      "name",
      "what"
    ],
    "createTime": 1674903023000
  }
])
// 编辑
const edit = row => {
	Form = row
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
	name: "",
	code: "",
	status:''
})
const value1 = ref<[Date, Date]>([
  new Date(2000, 10, 10, 10, 10),
  new Date(2000, 10, 11, 10, 10),
])
const resetSearchForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
	searchForm = reactive({
  name: "",
  code: "",
  status:''
})
  formEl.resetFields()
}
// 对话框
const dialogVisible = ref(false)
const closeDialog = ()=>{
	dialogVisible.value = false
	console.log('closeDialog');
}

// 对话框表单
import type { FormInstance, FormRules } from 'element-plus'
const FormRef = ref<FormInstance>()
let Form = reactive({
  id: null,
  code: null,
  name: null,
  content: null,
  nickname: null,
  type: null,
  status: null,
  createTime: null,
})
const Rules = reactive<FormRules>({
	code: [
	    { required: true, message: '请输入模版编码', trigger: 'blur' },
	  ],
	name: [
	    { required: true, message: '请输入模版名称', trigger: 'blur' },
	  ],
	content: [
	    { required: true, message: '请输入模版内容', trigger: 'blur' },
	  ],
	nickname:[
	  { required: true, message: '请输入发件人名称', trigger: 'blur' },
	],
	type: [
	  { required: true, message: '请选择类型', trigger: 'blur' },
	],
	status: [
	  { required: true, message: '请选择开启状态', trigger: 'blur' },
	],
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    }
  })
}

// 对话框详情
const dialogInfoVisible = ref(false)
const closeInfoDialog = ()=>{
	dialogInfoVisible.value = false
	console.log('closeInfoDialog');
}
const testFormRef = ref<FormInstance>()
// 描述信息表单
let testForm = reactive({
  id: null,
  content: '你好，欢迎 {name} 加入大家庭！',
	params:['name'],
  mobile: null,
  templateParams:{
		name:null,
	},
	templateCode: "register",
	userId:null,
  createTime: null,
})
const testFormRules = reactive<FormRules>({
	content: [
	    { required: true, message: '请输入模版内容', trigger: 'blur' },
	  ],
	userId: [
	    { required: true, message: '请输入接收人', trigger: 'blur' },
	  ],
	name: [
	    { required: true, message: '请输入参数{name}', trigger: 'blur' },
	  ],
})

const submitTestForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    }
  })
}
// 详情
const info = row => {
	testForm = row
	// testForm.templateCode.value = row.code
	dialogInfoVisible.value = true
};
</script>
<template>
	<div class="container">
		<!-- 搜索 -->
		<el-card class="box-card">
			<el-form ref="searchFormRef" :model="searchForm" label-width="80px" status-icon>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="模版编码"><el-input v-model="searchForm.code" placeholder="请输入模版编码"/></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="模版名称"><el-input v-model="searchForm.name" placeholder="请输入模版名称"/></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="开启状态">
							<el-select v-model="searchForm.status" clearable placeholder="请选择状态">
								<el-option label="开启" :value="true" />
								<el-option label="关闭" :value="false" />
							</el-select>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="创建时间">
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
					<el-button icon="Plus" type="primary" plain>新增</el-button>
					<el-button icon="EditPen" type="success" plain>修改</el-button>
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
				<el-table-column prop="name" label="模版名称" align="center" show-overflow-tooltip/>
				<el-table-column prop="type" label="类型">
					<template #default="scope">
						<el-tag v-if="scope.row.type == 2" type="success">系统消息</el-tag>
						<el-tag v-if="scope.row.type == 1" type="danger">通知公告</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="nickname" label="发送人名称" align="center" />
				<el-table-column prop="content" label="模版内容" align="center" show-overflow-tooltip/>
				<el-table-column prop="status" label="开启状态">
					<template #default="scope">
						<el-tag v-if="scope.row.status==0">开启</el-tag>
						<el-tag v-else type="info">关闭</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip/>
				<el-table-column prop="createTime" label="创建时间" align="center" width="140" />
				<el-table-column label="操作" fixed="right" align="center" width="140">
					<template #default="scope">
						<el-button type="primary" link @click="edit(scope.row)">编辑</el-button>
						<el-button type="primary" link @click="info(scope.row)">测试</el-button>
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
			<el-form ref="FormRef" :model="Form" :rules="Rules" label-width="80px" status-icon>
				<el-form-item label="模版编码" prop="code"><el-input v-model="Form.code" placeholder="请输入模版编码"/></el-form-item>
				<el-form-item label="模版名称" prop="name"><el-input v-model="Form.name" placeholder="请输入模版名称"/></el-form-item>
				<el-form-item label="发件人名称" prop="nickname"><el-input v-model="Form.nickname" placeholder="请输入发件人名称"/></el-form-item>
				<el-form-item label="模版内容" prop="content"><el-input v-model="Form.content" type="textarea" placeholder="请输入模版内容"/></el-form-item>
				<el-form-item label="类型" prop="type">
					<el-select v-model="Form.type" clearable placeholder="请选择类型">
						<el-option label="开启" :value="true" />
						<el-option label="关闭" :value="false" />
					</el-select>
				</el-form-item>
				<el-form-item label="开启状态" prop="status" placeholder="请选择状态">
					<el-radio-group v-model="Form.status">
						<el-radio :label="true">开启</el-radio>
						<el-radio :label="false">关闭</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="备注" ><el-input v-model="Form.remark" type="textarea" placeholder="请输入备注"/></el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="submitForm(dictFormRef)">确定</el-button>
					<el-button @click="closeDialog">取消</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 对话框 详情 -->
		<el-dialog v-model="dialogInfoVisible" title="详情" draggable @close="closeInfoDialog">
			<el-form ref="testFormRef" :model="testForm" :rules="testFormRules" label-width="80px" status-icon>
				<el-form-item label="模版内容" prop="content"><el-input v-model="testForm.content" type="textarea" placeholder="请输入模版内容"/></el-form-item>
				<el-form-item label="接收人" prop="userId">
					<el-select v-model="testForm.userId" clearable placeholder="请选择接收人">
						<el-option label="你的Maya" :value="10000" />
						<el-option label="双双" :value="10001" />
						<el-option label="张三" :value="10002" />
						<el-option label="李四" :value="10003" />
					</el-select>
				</el-form-item>
				<el-form-item label="参数{name}" prop="name"><el-input v-model="testForm.templateParams" placeholder="请输入参数{name}"/></el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="submitTestForm(dictFormRef)">确定</el-button>
					<el-button @click="closeInfoDialog">取消</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss"></style>
