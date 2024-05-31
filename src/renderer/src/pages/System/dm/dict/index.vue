<script setup lang="ts">
import { ref ,reactive} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router'
 const router = useRouter()
// 表格数据
const tableData = reactive([
	{
		id: 1,
		name: '性别',
		type: 'user_info_sex',
		sort: 1,
		remark: '用户的性别',
		status:true,
		createTime: '2023-05-20 20:30:50'
	},
	{
		id: 2,
		name: '操作类别',
		type: 'system_log_log_category',
		sort: 2,
		remark: '操作类别',
		status:true,
		createTime: '2023-05-20 20:30:50'
	},
	{
		id: 3,
		name: '操作类型',
		type: 'system_log_log_type',
		sort: 3,
		remark: '操作类型',
		status:true,
		createTime: '2023-05-20 20:30:50'
	},
])
// 编辑
const edit = row => {
	dictForm = row
	dialogVisible.value = true
};
// 数据
const toDictDataPage = (type:string)=>{
	router.push({
	  name: 'SystemDictData',
	  params: { type },
	})
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
 name: null,
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
  name: null,
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
const ruleFormRef = ref<FormInstance>()
let dictForm = reactive({
  id: null,
  name: null,
  type: null,
  sort: null,
  remark: null,
  status:null,
  createTime: null,
})
const dictRules = reactive<FormRules>({
	name: [
	    { required: true, message: '请输入字典名称', trigger: 'blur' },
	  ],
	type: [
	    { required: true, message: '请输入字典类型', trigger: 'blur' },
	  ],
	status: [
	    { required: true, message: '请选择字典状态', trigger: 'blur' },
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
						<el-form-item label="字典名称"><el-input v-model="searchForm.name" /></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="字典类型"><el-input v-model="searchForm.type" /></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="字典状态">
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
				<el-table-column prop="id" label="编号" align="center" width="40px" />
				<el-table-column prop="name" label="字典名称" align="center" show-overflow-tooltip />
				<el-table-column prop="type" label="字典类型" show-overflow-tooltip />
				<el-table-column prop="sort" label="排序" show-overflow-tooltip />
				<el-table-column prop="remark" label="字典备注" show-overflow-tooltip />
				<el-table-column prop="status" label="字典状态">
					<template #default="scope">
						<el-tag v-if="scope.row.status">开启</el-tag>
						<el-tag v-else type="info">关闭</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center" width="140" />
				<el-table-column label="操作" fixed="right" align="center" width="140">
					<template #default="scope">
						<el-button type="primary" link @click="edit(scope.row)">编辑</el-button>
						<el-button type="primary" link @click="toDictDataPage(scope.row.type)">数据</el-button>
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
			<el-form ref="dictFormRef" :model="dictForm" :rules="dictRules" label-width="80px" status-icon>
				<el-form-item label="字典名称" prop="name"><el-input v-model="dictForm.name" /></el-form-item>
				<el-form-item label="字典类型" prop="type"><el-input v-model="dictForm.type" disabled /></el-form-item>
				<el-form-item label="字典状态" prop="status">
					<el-radio-group v-model="dictForm.status">
						<el-radio :label="true">开启</el-radio>
						<el-radio :label="false">关闭</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="字典备注" prop="dictForm.type"><el-input v-model="dictForm.remark" type="textarea" /></el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button type="primary" @click="submitDictForm(dictFormRef)">确定</el-button>
					<el-button @click="closeDialog">取消</el-button>
				</span>
			</template>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss"></style>
