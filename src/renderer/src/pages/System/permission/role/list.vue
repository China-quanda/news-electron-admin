<script setup lang="ts">
import { ref ,reactive} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
// import { getRoleList,deleteRole,addRole,setDefaultRole,getRoleId,editRole } from '@/api/role';
// 表格数据
const tableData = reactive([
  {
		id:1,
		name:'你的Maya1',
		status:1,
		is_default:0,
    createTime: 1653315496000
  },
	{
		id:2,
		name:'你的Maya1',
		status:1,
		is_default:0,
	  createTime: 1653315496000
	},
	{
		id:3,
		name:'你的Maya1',
		status:1,
		is_default:0,
	  createTime: 1653315496000
	},
	{
		id:4,
		name:'你的Maya',
		status:1,
		is_default:1,
	  createTime: 1653315496000
	},
	{
		id:5,
		name:'你的Maya1',
		status:1,
		is_default:0,
	  createTime: 1653315496000
	},
])
// 编辑
const edit = row => {
	Form = row
	dialogTitle.value = '编辑'
	dialogVisible.value = true
};
// 新增
const add = row => {
	Form = row
	dialogTitle.value = '新增'
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
  is_default: null,
  status: null,
  createTime: null,
})
const Rules = reactive<FormRules>({
	name: [
	    { required: true, message: '请输入角色名称', trigger: 'blur' },
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
      // const res = await editRole(id, { status: status });
      // this.$message.success(`${status ? "该用户状态设置为正常" : "已拉黑该用户，并已限制该用户登录"}`);
    }
		// 设置默认角色
		const setDefaultRole=async(id)=>{
		  // await setDefaultRole(id)
		  // getRoleList();
		  // this.$message.success('设置默认角色成功');
		}
</script>
<template>
	<div class="container">
		<!-- 表格 -->
		<el-card class="box-card">
			<!-- 功能区域 -->
			<div style="display: flex; justify-content: space-between; margin:0px 15px 15px 15px;">
				<div>
					<el-button icon="Plus" type="primary" plain @click="add">新增</el-button>
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
				<el-table-column prop="name" label="角色名称" align="center" show-overflow-tooltip />
				<el-table-column prop="status" label="状态">
					<template #default="scope">
						<el-switch
						  v-model="scope.row.status" @change="disable(scope.row)">
						</el-switch>
					</template>
				</el-table-column>
				<el-table-column prop="status" label="默认角色">
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.is_default">是</el-tag>
						<el-tag v-else>否</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="注册时间" align="center" width="140" />
				<el-table-column label="操作" fixed="right" align="center" width="180">
					<template #default="scope">
						<el-button type="waing" link @click="setDefaultRole(scope.row.id)">设为默认角色</el-button>
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
				<el-form-item label="角色名称" prop="nickname"><el-input v-model="Form.name" placeholder="请输入昵称" /></el-form-item>
				<el-form-item label="状态">
					<el-switch
					  v-model="Form.status" @change="disable(Form)">
					</el-switch>
				</el-form-item>
				<el-form-item label="默认角色">
					<el-switch
					  v-model="Form.is_default" @change="disable(Form)">
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
