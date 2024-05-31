<script setup lang="ts">
import { ref ,reactive} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router'
 const router = useRouter()
// 表格数据
const tableData = reactive([
        {
            "title": "维护通知：2018-07-01 若依系统凌晨维护",
            "type": 2,
            "content": "<p><img src=\"http://test.yudao.iocoder.cn/b7cb3cf49b4b3258bf7309a09dd2f4e5.jpg\">维护内容</p>",
            "status": 1,
            "id": 2,
            "createTime": 1609837428000
        },
        {
            "title": "芋道的公众",
            "type": 1,
            "content": "<p>新版本内容133</p>",
            "status": 0,
            "id": 1,
            "createTime": 1609837428000
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
  title: null,
  type: null,
  content: null,
  remark: null,
  status:null,
  createTime: null,
})
const Rules = reactive<FormRules>({
	title: [
	    { required: true, message: '请输入公告标题', trigger: 'blur' },
	  ],
	type: [
	    { required: true, message: '请输入公告类型', trigger: 'blur' },
	  ],
	status: [
	    { required: true, message: '请选择公告状态', trigger: 'blur' },
	  ],
		content:[
	    { required: true, message: '请输入公告内容', trigger: 'blur' },
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
				<el-table-column prop="id" label="编号" align="center" width="40px" />
				<el-table-column prop="title" label="公告标题" align="center" show-overflow-tooltip />
				<el-table-column prop="type" label="公告类型">
					<template #default="scope">
						<el-tag v-if="scope.row.type == 1">公告</el-tag>
						<el-tag v-if="scope.row.type == 2">通知</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="status" label="公告状态">
					<template #default="scope">
						<el-tag v-if="scope.row.status">开启</el-tag>
						<el-tag v-else type="info">关闭</el-tag>
					</template>
				</el-table-column>
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
				<el-form-item label="公告标题" prop="title"><el-input v-model="Form.title" /></el-form-item>
				<el-form-item label="公告内容" prop="content"><el-input v-model="Form.content" type="textarea" /></el-form-item>
				<el-form-item label="公告类型" prop="type">
					<el-select v-model="Form.type" clearable placeholder="请选择类型">
						<el-option label="通知" :value="1" />
						<el-option label="公告" :value="2" />
					</el-select>
				</el-form-item>
				<el-form-item label="公告状态" prop="status">
					<el-radio-group v-model="Form.status">
						<el-radio :label="true">开启</el-radio>
						<el-radio :label="false">关闭</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="备注" ><el-input v-model="Form.remark" type="textarea" /></el-form-item>
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
