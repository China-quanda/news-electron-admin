<script setup lang="ts">
import { ref ,reactive} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
// 表格数据
const tableData = reactive([
	{
		id: 1,
		name: '白痴',
		replace: '你很聪明',
		description: '侮辱人格',
		tags: ['测试', '侮辱'],
		status: true,
		createTime: '2023-05-20 20:30:50'
	},
	{
		id: 2,
		name: '你妈的',
		replace: '问侯你母亲',
		description: '侮辱人格',
		tags: ['骂人', '侮辱'],
		status: false,
		createTime: '2023-05-20 20:30:50'
	},
	{
		id: 2,
		name: '你妈的',
		replace: '问侯你母亲,问侯你母亲,问侯你母亲,问侯你母亲,问侯你母亲,问侯你母亲',
		description: '侮辱人格',
		tags: ['骂人', '侮辱'],
		status: false,
		createTime: '2023-05-20 20:30:50'
	}
])
// 编辑
const edit = row => {
	ruleForm = row
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

// 对话框
const dialogVisible = ref(false)
const closeDialog = ()=>{
	dialogVisible.value = false
	console.log('closeDialog');
}
// 对话框表单
import type { FormInstance, FormRules } from 'element-plus'
const ruleFormRef = ref<FormInstance>()
let ruleForm = reactive({
  id: null,
  name: '',
  replace: '',
  description: '',
  tags: [],
  status: true,
  createTime: '',
	date:[]
})
const rules = reactive<FormRules>({
	name: [
	    { required: true, message: '请输入敏感词', trigger: 'blur' },
	  ],
	replace: [
	    { required: true, message: '请输入替换词', trigger: 'blur' },
	  ]
})
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
	ruleForm = {}
  formEl.resetFields()
}

//搜索
const searchFormRef = ref<FormInstance>()
let searchForm = reactive({
  name: '',
  tags: [],
  status: null,
  createTime: '',
	date:[]
})
const value1 = ref<[Date, Date]>([
  new Date(2000, 10, 10, 10, 10),
  new Date(2000, 10, 11, 10, 10),
])
const resetSearchForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
	searchForm = reactive({
  name: '',
  tags: [],
  status: null,
  createTime: '',
	date:[]
})
  formEl.resetFields()
}

// 检测敏感词弹框
let detectionDialogVisible = ref(false)
// 关闭
const closedetectionDialog = ()=>{
	detectionDialogVisible.value = false
	
}
// 检测按钮
const submitDetectionForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
			ElMessage({
				message: `包含敏感词 ： ${detectionForm.name}`,
				type: 'warning'
			});
    }
  })
}
let detectionForm = reactive({
  name: null,
  tags: [],
})
const detectionRules = reactive<FormRules>({
	'detectionRules.name': [
	    { required: true, message: '请输入敏感词', trigger: 'blur' },
	  ],
	'detectionRules.tags': [
	    { required: true, message: '请选择标签', trigger: 'blur' },
	  ]
})
</script>

<template>
	<div class="container">
		<!-- 搜索 -->
		<el-card class="box-card">
			<el-form ref="searchFormRef" :model="searchForm" label-width="80px" status-icon>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="敏感词"><el-input v-model="searchForm.name"  /></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="状态">
							<el-select v-model="searchForm.status" clearable placeholder="请选择状态" >
								<el-option label="开启" :value="true" />
								<el-option label="关闭" :value="false" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="标签">
							<el-select v-model="searchForm.tags" clearable placeholder="请选择敏感词标签" >
								<el-option label="骂人" value="骂人" />
								<el-option label="侮辱" value="侮辱" />
				  		<el-option label="测试" value="测试" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="创建时间">
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
					<el-button icon="plus" type="primary" plain>新增</el-button>
					<el-button icon="Delete" type="danger" plain :disabled="delBtnDisabled" @click="del([])">删除</el-button>
					<el-button icon="Bottom" type="success" plain>导出</el-button>
					<el-button icon="DocumentChecked" type="warning" plain @click="detectionDialogVisible = true">测试</el-button>
				</div>
				<div>
					<el-tooltip class="box-item" effect="light" content="隐藏/显示 搜索" placement="top"><el-button icon="Search" circle></el-button></el-tooltip>
					<el-tooltip class="box-item" effect="light" content="刷新" placement="top"><el-button icon="Refresh" circle></el-button></el-tooltip>
				</div>
			</div>
			<el-alert title="info alert" type="info" show-icon />
			
			<el-table :data="tableData" style="width: 100%" @selection-change="selectable">
				<el-table-column prop="id" label="编号" align="center" width="40px" type="selection" />
				<el-table-column prop="id" label="编号" align="center" width="40px" />
				<el-table-column prop="name" label="敏感词" show-overflow-tooltip />
				<el-table-column prop="replace" label="替换词" show-overflow-tooltip />
				<el-table-column prop="status" label="状态">
					<template #default="scope">
						<el-tag v-if="scope.row.status">开启</el-tag>
						<el-tag v-else type="info">关闭</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="description" label="描述" show-overflow-tooltip />
				<el-table-column prop="tags" label="标签" align="center" width="160">
					<template #default="scope">
						<el-tag v-for="(tag, index) in scope.row.tags" :key="index">{{ tag }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center" width="140" />
				<el-table-column label="操作" fixed="right" align="center" width="100">
					<template #default="scope">
						<el-button type="primary" link  @click="edit(scope.row)">编辑</el-button>
						<el-button type="danger" link  @click="del([scope.row.id])">删除</el-button>
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
			<el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="80px" status-icon>
				<el-form-item label="敏感词" prop="name"><el-input v-model="ruleForm.name" /></el-form-item>
				<el-form-item label="替换词" prop="replace"><el-input v-model="ruleForm.replace" /></el-form-item>
				<el-form-item label="状态">
					<el-radio-group v-model="ruleForm.status">
						<el-radio :label="true">开启</el-radio>
						<el-radio :label="false">关闭</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="描述"><el-input v-model="ruleForm.description" type="textarea" placeholder="请输入描述内容" /></el-form-item>
				<el-form-item label="标签">
					<el-select v-model="ruleForm.tags" multiple collapse-tags collapse-tags-tooltip :max-collapse-tags="4" placeholder="请选择敏感词标签" style="width: 100%">
						<el-option label="骂人" value="骂人" />
						<el-option label="侮辱" value="侮辱" />
						<el-option label="测试" value="测试" />
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="resetForm(ruleFormRef)">重置</el-button>
					<el-button @click="closeDialog">取消</el-button>
					<el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
				</span>
			</template>
		</el-dialog>
		<!-- 检测敏感词弹框 -->
		<el-dialog  v-model="detectionDialogVisible" title="检测敏感词" draggable @close="closedetectionDialog">
			<el-form ref="detectionFormRef" :model="detectionForm" :rules="detectionRules" label-width="80px" status-icon>
				<el-form-item label="敏感词" prop="detectionRules.name"><el-input v-model="detectionForm.name" type="textarea"/></el-form-item>
				<el-form-item label="标签" prop="detectionRules.tags">
					<el-select v-model="detectionForm.tags" clearable placeholder="请选择敏感词标签" >
						<el-option label="骂人" value="骂人" />
						<el-option label="侮辱" value="侮辱" />
					<el-option label="测试" value="测试" />
					</el-select>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="submitDetectionForm(detectionFormRef)">检测</el-button>
					<el-button @click="closedetectionDialog">取消</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss"></style>
