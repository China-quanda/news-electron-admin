<script setup lang="ts">
import { ref ,reactive} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router'
 const router = useRouter()
// 表格数据
const tableData = reactive([
  {
    "name": "后台用户短信登录",
    "code": "admin-sms-login",
    "accountId": 1,
    "nickname": "奥特曼",
    "title": "你猜我猜",
    "content": "<p>您的验证码是{code}，名字是{name}</p>",
    "status": 0,
    "remark": "3",
    "id": 13,
    "params": [
      "code",
      "name"
    ],
    "createTime": 1633911000000
  },
  {
    "name": "测试模版",
    "code": "test_01",
    "accountId": 2,
    "nickname": "芋艿",
    "title": "一个标题",
    "content": "<p>你是 {key01} 吗？</p><p><br></p><p>是的话，赶紧 {key02} 一下！</p>",
    "status": 0,
    "remark": null,
    "id": 14,
    "params": [
      "key01",
      "key02"
    ],
    "createTime": 1674667660000
  },
  {
    "name": "3",
    "code": "2",
    "accountId": 2,
    "nickname": "7",
    "title": "4",
    "content": "<p>45</p>",
    "status": 1,
    "remark": "80",
    "id": 15,
    "params": [],
    "createTime": 1674805835000
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
	accountId:'',
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
  accountId:'',
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
  accountId: null,
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
	accountId:[
	  { required: true, message: '请输入邮箱账号', trigger: 'blur' },
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
  content: null,
  mail: null,
  templateParams:{
		name:null,
		code:null
	},
	templateCode: "admin-sms-login",
	params:['name','code'],
  createTime: null,
})
const testFormRules = reactive<FormRules>({
	
	mail: [
	    { required: true, message: '请输入收件箱', trigger: 'blur' },
	  ],
	content: [
	    { required: true, message: '请输入模版内容', trigger: 'blur' },
	  ],
	code: [
	    { required: true, message: '请输入参数{code}', trigger: 'blur' },
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
						<el-form-item label="邮箱账号" prop="accountId">
							<el-select v-model="searchForm.accountId" clearable placeholder="请选择邮箱账号">
								<el-option label="7684413@qq.com" :value="1" />
								<el-option label="ydym_test@163.com" :value="2" />
							</el-select>
						</el-form-item>
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
				<el-table-column prop="title" label="模版标题" align="center" show-overflow-tooltip/>
				<el-table-column prop="content" label="模版内容" align="center" show-overflow-tooltip/>
				<el-table-column prop="accountId" label="邮箱账号" align="center" show-overflow-tooltip/>
				<el-table-column prop="nickname" label="发送人名称" align="center" />
				<el-table-column prop="status" label="开启状态 SSL">
					<template #default="scope">
						<el-tag v-if="scope.row.status">是</el-tag>
						<el-tag v-else type="info">否</el-tag>
					</template>
				</el-table-column>
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
				<el-form-item label="模版标题" ><el-input v-model="Form.title" placeholder="请输入模版标题"/></el-form-item>
				<el-form-item label="模版内容" prop="content"><el-input v-model="Form.content" type="textarea" placeholder="请输入模版内容"/></el-form-item>
				<el-form-item label="邮箱账号" prop="accountId">
					<el-select v-model="Form.accountId" clearable placeholder="请选择邮箱账号">
						<el-option label="7684413@qq.com" :value="1" />
						<el-option label="ydym_test@163.com" :value="2" />
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
				<el-form-item label="收件邮箱" prop="mail"><el-input v-model="testForm.mail" type="textarea" placeholder="请输入收件邮箱"/></el-form-item>
				<el-form-item label="参数{name}" prop="name"><el-input v-model="testForm.templateParams" placeholder="请输入参数{name}"/></el-form-item>
				<el-form-item label="参数{code}" prop="code"><el-input v-model="testForm.templateParams" placeholder="请输入参数{code}"/></el-form-item>
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
