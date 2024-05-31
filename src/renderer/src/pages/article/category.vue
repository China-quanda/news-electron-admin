<script setup lang="ts">
import { ref ,reactive} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
// import { getUserList ,deleteUser,addUser,getUserId,editUser} from '@/api/user';
// 表格数据
const tableData = reactive([
  {
		id:1,
		name:'军事',
		keywords:'军事',
		description:'军事',
		status:'1',
    createTime: 1653315496000
  },
	{
		id:2,
		name:'科技',
		keywords:'科技',
		description:'科技',
		status:'1',
	  createTime: 1653315496000
	},
	{
		id:3,
		name:'娱乐',
		keywords:'娱乐',
		description:'娱乐',
		status:'1',
	  createTime: 1653315496000
	},
	{
		id:4,
		name:'体育',
		keywords:'体育',
		description:'体育',
		status:'1',
	  createTime: 1653315496000
	},
])
// 编辑
const edit = row => {
	Form = row
	dialogTitle.value = '编辑类目'
	dialogVisible.value = true
};
// 新增1
const add1 = row => {
	Form = row
	dialogTitle.value = '添加一级类目'
	dialogVisible.value = true
};
// 新增2
const add2 = row => {
	Form = row
	dialogTitle.value = `添加${row.name}的下级类目`
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
const dialogTitle = ref('')
// 对话框表单
import type { FormInstance, FormRules } from 'element-plus'
const FormRef = ref<FormInstance>()
let Form = reactive({
  id: null,
  name: null,
  keywords: null,
  description: null,
  status: null,
  createTime: null,
})
const Rules = reactive<FormRules>({
	name: [
	    { required: true, message: '请输入用户名', trigger: 'blur' },
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
// 滑块功能
    const	disable=async(row)=> {
      const { id, status } = row;
      // const res = await editUser(id, { status: status });
      // this.$message.success(`${status ? "该用户状态设置为正常" : "已拉黑该用户，并已限制该用户登录"}`);
    }
</script>
<template>
	<div class="container">
		<!-- 表格 -->
		<el-card class="box-card">
			<!-- 功能区域 -->
			<div style="display: flex; justify-content: space-between; margin:0px 15px 15px 15px;">
				<div>
					<el-button icon="Plus" type="primary" plain @click="add1">添加一级类目</el-button>
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
				<el-table-column prop="name" label="类目名称"> </el-table-column>
				<el-table-column prop="keywords" label="类目关键词"  align="center">
				</el-table-column>
				 <el-table-column prop="description" label="类目描述"  align="center">
				</el-table-column>
				<el-table-column prop="status" label="状态">
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.status">启用</el-tag>
						<el-tag v-else>禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center" width="140" />
				<el-table-column label="操作" fixed="right" align="center" width="190">
					<template #default="scope">
						<el-button type="primary" link @click="add2(scope.row)">添加下级类目</el-button>
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
		<el-dialog v-model="dialogVisible" :title="dialogTitle" draggable @close="closeDialog">
			<el-form ref="dictFormRef" :model="Form" :rules="Rules" label-width="80px" status-icon>
				<el-form-item prop="name" label="类目名称">
				  <el-input v-model="Form.name"></el-input>
				</el-form-item>
				 <el-form-item label="关键词">
				  <el-input v-model="Form.keywords"></el-input>
				</el-form-item>
				 <el-form-item label="类目描述">
				  <el-input v-model="Form.description"></el-input>
				</el-form-item>
				<el-form-item label="类目状态">
				  <el-switch
				    v-model="Form.status"
				    active-text="启用"
				    inactive-text="禁用"
				  >
				  </el-switch>
				</el-form-item>
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
