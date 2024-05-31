<script setup lang="ts">
import { ref ,reactive} from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus';
// import { getAccusationArticleList,deleteAccusationArticle,getAccusationArticleInfo,putAccusationArticleInfo} from "@/api/articleReports";
// 表格数据
const tableData = reactive([
  {
  	id:1,
		comment_user:{
			user_name:'小牛马',
		},
  	parentId:1 || 0,
  	content:'标题夸张的一批',
		reply_user:{
			user_name:'da牛马'
		},
		comment_article:{
			title:'webpack2 + vue2 老项目迁移'
		},
  	status:1,
    createTime: 1653315496000
  },
  {
  	id:2,
  	comment_user:{
  		user_name:'小牛马',
  	},
  	parentId:0,
  	content:'标题夸张的一批',
  	reply_user:{
  		user_name:''
  	},
  	comment_article:{
  		title:'成功! 是真香啊...',
  	},
  	status:1,
    createTime: 1653315496000
  },
	{
		id:3,
		comment_user:{
			user_name:'小牛马',
		},
		parentId:0,
		content:'标题夸张的一批',
		reply_user:{
			user_name:''
		},
		comment_article:{
			title:'成功! 是真香啊...',
		},
		status:1,
	  createTime: 1653315496000
	},
	{
		id:4,
		comment_user:{
			user_name:'小牛马',
		},
		parentId:1 || 0,
		content:'标题夸张的一批',
		reply_user:{
			user_name:'da牛马'
		},
		comment_article:{
			title:'webpack2 + vue2 老项目迁移'
		},
		status:1,
	  createTime: 1653315496000
	},
])
// 编辑
const edit = row => {
	Form = row
	dialogTitle.value = '审核'
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
  title: null,
  type: null,
  user_name: null,
  remark: null,
  status: null,
  createTime: null,
})
const Rules = reactive<FormRules>({
	status: [
	    { required: true, message: '请选择审核状态', trigger: 'blur' },
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
		<!-- 表格 -->
		<el-card class="box-card">
			<!-- 功能区域 -->
			<div style="display: flex; justify-content: space-between; margin:0px 15px 15px 15px;">
				<div>
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
				<el-table-column prop="comment_user.user_name" label="昵称" align="center" show-overflow-tooltip />
				<el-table-column label="类型" width="70px">
					<template #default="scope">
						<el-tag type="success" v-if="scope.row.parentId===0">评论</el-tag>
						<el-tag v-else>回复</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="reply_user.user_name"  width="80" align="center"/>
				<el-table-column prop="content" label="内容" > </el-table-column>
				<el-table-column prop="comment_article.title" label="所属文章"> </el-table-column>
				<el-table-column prop="status" label="状态">
					<template #default="scope">
						<!-- 1:审核中;2:审核通过;3审核失败;) -->
						<el-tag type="info" v-if="scope.row.status==1">审核中</el-tag>
						<el-tag type="success" v-else-if="scope.row.status==2">审核通过</el-tag>
						<el-tag type="danger" v-else>审核失败</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="createTime" label="时间" align="center" width="140" />
				<el-table-column label="操作" fixed="right" align="center" width="140">
					<template #default="scope">
						<el-button type="primary" link @click="edit(scope.row)">审核</el-button>
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
				<el-radio-group v-model="Form.status">
				  <el-radio :label="1">审核中</el-radio>
				  <el-radio :label="2">审核通过</el-radio>
				  <el-radio :label="3">审核失败</el-radio>
				</el-radio-group>
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
