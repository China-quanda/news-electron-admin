<script setup lang="ts">
import { ref ,reactive} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router'
 const router = useRouter()
// 表格数据
const tableData = reactive([
  {
    "mail": "7684413@qq.com",
    "username": "7684413@qq.com",
    "password": "123457",
    "host": "127.0.0.1",
    "port": 8080,
    "sslEnable": false,
    "id": 1,
    "createTime": 1674639592000
  },
  {
    "mail": "ydym_test@163.com",
    "username": "ydym_test@163.com",
    "password": "WBZTEINMIFVRYSOE",
    "host": "smtp.163.com",
    "port": 465,
    "sslEnable": true,
    "id": 2,
    "createTime": 1674667563000
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
	mail: "",
	username: "",
})
const value1 = ref<[Date, Date]>([
  new Date(2000, 10, 10, 10, 10),
  new Date(2000, 10, 11, 10, 10),
])
const resetSearchForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
	searchForm = reactive({
  mail: "",
  username: "",
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
  mail: null,
  username: null,
  password: null,
  host: null,
  port: null,
  sslEnable: null,
  createTime: null,
})
const Rules = reactive<FormRules>({
	mail: [
	    { required: true, message: '请输入邮箱', trigger: 'blur' },
	  ],
	username: [
	    { required: true, message: '请输入用户名', trigger: 'blur' },
	  ],
	password: [
	    { required: true, message: '请输入密码', trigger: 'blur' },
	  ],
	host:[
	  { required: true, message: '请输入SMTP 服务器域名', trigger: 'blur' },
	],
	port:[
	  { required: true, message: '请输入SMTP 服务器端口', trigger: 'blur' },
	],
	sslEnable: [
	  { required: true, message: '请选择是否开启 SSL', trigger: 'blur' },
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
// 描述信息
let dialogData = reactive({});
// 详情
const info = row => {
	dialogData = row
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
						<el-form-item label="邮箱"><el-input v-model="searchForm.mail" placeholder="请输入邮箱"/></el-form-item>
					</el-col>
					<el-col :span="6">
						<el-form-item label="用户名"><el-input v-model="searchForm.username" placeholder="请输入用户名"/></el-form-item>
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
				<el-table-column prop="mail" label="邮箱" align="center" show-overflow-tooltip />
				<el-table-column prop="username" label="用户名" align="center" show-overflow-tooltip />
				<el-table-column prop="host" label="SMTP 服务器域名" align="center" show-overflow-tooltip />
				<el-table-column prop="port" label="SMTP 服务器端口" align="center"  />
				<el-table-column prop="sslEnable" label="是否开启 SSL">
					<template #default="scope">
						<el-tag v-if="scope.row.sslEnable">是</el-tag>
						<el-tag v-else type="info">否</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center" width="140" />
				<el-table-column label="操作" fixed="right" align="center" width="140">
					<template #default="scope">
						<el-button type="primary" link @click="edit(scope.row)">编辑</el-button>
						<el-button type="primary" link @click="info(scope.row)">详情</el-button>
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
				<el-form-item label="邮箱" prop="mail"><el-input v-model="Form.mail" placeholder="请输入邮箱"/></el-form-item>
				<el-form-item label="用户名" prop="username"><el-input v-model="Form.username" placeholder="请输入用户名"/></el-form-item>
				<el-form-item label="密码" prop="password"><el-input v-model="Form.password" placeholder="请输入密码型"/></el-form-item>
				<el-form-item label="SMTP 服务器域名" prop="host"><el-input v-model="Form.host" placeholder="请输入SMTP 服务器域名"/></el-form-item>
				<el-form-item label="SMTP 服务器端口" prop="port"><el-input v-model.number="Form.port" placeholder="请输入SMTP 服务器端口"/></el-form-item>
				<el-form-item label="是否开启 SSL" prop="sslEnable">
					<el-radio-group v-model="Form.sslEnable">
						<el-radio :label="true">是</el-radio>
						<el-radio :label="false">否</el-radio>
					</el-radio-group>
				</el-form-item>
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
			<el-descriptions
			    :column="1"
			    size="small"
			    border
			  >
			    <el-descriptions-item label="邮箱" width="80px">{{dialogData.mail}}</el-descriptions-item>
			    <el-descriptions-item label="用户名" >{{dialogData.username}}</el-descriptions-item>
			    <el-descriptions-item label="密码" >{{dialogData.password}}</el-descriptions-item>
			    <el-descriptions-item label="SMTP 服务器域名" >{{dialogData.host}}</el-descriptions-item>
			    <el-descriptions-item label="SMTP 服务器端口" >{{dialogData.port}}</el-descriptions-item>
					<el-descriptions-item label="是否开启 SSL" >
						<el-tag >{{dialogData.sslEnable ? '是' : '否'}}</el-tag>
					</el-descriptions-item>
			    <el-descriptions-item label="创建时间" >{{dialogData.createTime}}</el-descriptions-item>
			  </el-descriptions>
		</el-dialog>
	</div>
</template>

<style scoped lang="scss"></style>
