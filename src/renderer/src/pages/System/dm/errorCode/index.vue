<script setup lang="ts">
import { ref ,reactive} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
// 表格数据
const tableData = reactive([
  {
    "applicationName": "yudao-server",
    "code": 1009011001,
    "message": "名字为【{}】的用户组已被禁用",
    "memo": "",
    "id": 5676,
    "type": 1,
    "createTime": 1653315496000
  },
  {
    "applicationName": "yudao-server",
    "code": 1009011000,
    "message": "用户组不存在",
    "memo": "",
    "id": 5675,
    "type": 1,
    "createTime": 1653315496000
  },
  {
    "applicationName": "yudao-server",
    "code": 1009010001,
    "message": "表单项({}) 和 ({}) 使用了相同的字段名({})",
    "memo": "",
    "id": 5674,
    "type": 1,
    "createTime": 1653315496000
  },
  {
    "applicationName": "yudao-server",
    "code": 1009010000,
    "message": "动态表单不存在啊",
    "memo": "",
    "id": 5673,
    "type": 2,
    "createTime": 1653315496000
  },
  {
    "applicationName": "yudao-server",
    "code": 1009006004,
    "message": "操作失败，原因：任务分配脚本({}) 不存在",
    "memo": "",
    "id": 5672,
    "type": 1,
    "createTime": 1653315496000
  },
  {
    "applicationName": "yudao-server",
    "code": 1009006003,
    "message": "操作失败，原因：找不到任务的审批人！",
    "memo": "",
    "id": 5671,
    "type": 1,
    "createTime": 1653315496000
  },
  {
    "applicationName": "yudao-server",
    "code": 1009006002,
    "message": "只有流程模型的任务分配规则，才允许被修改",
    "memo": "",
    "id": 5670,
    "type": 1,
    "createTime": 1653315496000
  },
  {
    "applicationName": "yudao-server",
    "code": 1009006001,
    "message": "流程任务分配规则不存在",
    "memo": "",
    "id": 5669,
    "type": 1,
    "createTime": 1653315496000
  },
  {
    "applicationName": "yudao-server",
    "code": 1009006000,
    "message": "流程({}) 的任务({}) 已经存在分配规则",
    "memo": "",
    "id": 5668,
    "type": 1,
    "createTime": 1653315496000
  },
  {
    "applicationName": "yudao-server",
    "code": 1009005001,
    "message": "审批任务失败，原因：该任务的审批人不是你",
    "memo": "",
    "id": 5667,
    "type": 1,
    "createTime": 1653315496000
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
 title: null,
 type: null,
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
  title: null,
  type: null,
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

// 对话框表单
import type { FormInstance, FormRules } from 'element-plus'
const FormRef = ref<FormInstance>()
let Form = reactive({
  id: null,
  applicationName: null,
  code: null,
  message: null,
  memo: null,
  createTime: null,
})
const Rules = reactive<FormRules>({
	applicationName: [
	    { required: true, message: '请输入应用名', trigger: 'blur' },
	  ],
	code: [
	    { required: true, message: '请输入错误编码', trigger: 'blur' },
	  ],
	message: [
	    { required: true, message: '请输入错误提示', trigger: 'blur' },
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
</script>
<template>
	<div class="container">
		<!-- 搜索 -->
		<el-card class="box-card">
			<el-form ref="searchFormRef" :model="searchForm" label-width="80px" status-icon>
				<el-row :gutter="20">
					<el-col :span="6">
						<el-form-item label="公告标题"><el-input v-model="searchForm.title" placeholder="请输入标题"/></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="公告类型">
							<el-select v-model="searchForm.type" clearable placeholder="请选择类型">
								<el-option label="通知" :value="1" />
								<el-option label="公告" :value="2" />
							</el-select>
						</el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="公告状态">
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
				<el-table-column prop="id" label="编号" align="center" width="50px" />
				<el-table-column prop="type" label="类型">
					<template #default="scope">
						<el-tag v-if="scope.row.type == 1" type="info">自动生产</el-tag>
						<el-tag v-if="scope.row.type == 2" type="warning">手动编辑</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="applicationName" label="应用名" align="center" show-overflow-tooltip />
				<el-table-column prop="code" label="错误编码" align="center"  />
				<el-table-column prop="message" label="错误提示" align="center" show-overflow-tooltip />
				<el-table-column prop="memo" label="备注" align="center" show-overflow-tooltip />
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
			<el-form ref="dictFormRef" :model="Form" :rules="Rules" label-width="80px" status-icon>
				<el-form-item label="应用名" prop="applicationName"><el-input v-model="Form.applicationName" placeholder="请输入应用名"/></el-form-item>
				<el-form-item label="错误编码" prop="code"><el-input v-model="Form.code" placeholder="请输入错误编码"/></el-form-item>
				<el-form-item label="错误提示" prop="message"><el-input v-model="Form.message" placeholder="请输入错误提示"/></el-form-item>
				<el-form-item label="备注" ><el-input v-model="Form.memo" placeholder="请输入备" type="textarea"/></el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="submitForm(dictFormRef)">确定</el-button>
					<el-button @click="closeDialog">取消</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss"></style>
