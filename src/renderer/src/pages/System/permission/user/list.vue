<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
// import { getUserList ,deleteUser,addUser,getUserId,editUser} from '@/api/user';
// 表格数据
const tableData = reactive([
  {
    id: 1,
    avatar: 'http://127.0.0.1:7001/public/upload/20220422/1650604284430.png',
    nickname: '你的Maya1',
    email: '877880098@qq.com',
    mobile: '18684868152',
    status: '1',
    roles: [
      {
        name: '董事长'
      },
      {
        name: '经理'
      },
      {
        name: '秘书'
      },
      {
        name: '保安'
      }
    ],
    createTime: 1653315496000
  },
  {
    id: 2,
    avatar: 'http://127.0.0.1:7001/public/upload/20220422/1650604284430.png',
    nickname: '你的Maya',
    email: '877880098@qq.com',
    mobile: '18684868151',
    status: '1',
    roles: [
      {
        name: '董事长'
      },
      {
        name: '经理'
      },
      {
        name: '秘书'
      },
      {
        name: '保安'
      }
    ],
    createTime: 1653315496000
  },
  {
    id: 3,
    avatar: 'http://127.0.0.1:7001/public/upload/20220422/1650604284430.png',
    nickname: '你的Maya',
    email: '877880098@qq.com',
    mobile: '18684868151',
    status: '1',
    roles: [
      {
        name: '董事长'
      },
      {
        name: '经理'
      },
      {
        name: '秘书'
      },
      {
        name: '保安'
      }
    ],
    createTime: 1653315496000
  },
  {
    id: 4,
    avatar: 'http://127.0.0.1:7001/public/upload/20220422/1650604284430.png',
    nickname: '你的Maya',
    email: '877880098@qq.com',
    mobile: '18684868151',
    status: '1',
    roles: [
      {
        name: '董事长'
      },
      {
        name: '经理'
      },
      {
        name: '秘书'
      },
      {
        name: '保安'
      }
    ],
    createTime: 1653315496000
  },
  {
    id: 5,
    avatar: 'http://127.0.0.1:7001/public/upload/20220422/1650604284430.png',
    nickname: '你的Maya',
    email: '877880098@qq.com',
    mobile: '18684868151',
    status: '1',
    roles: [
      {
        name: '董事长'
      },
      {
        name: '经理'
      },
      {
        name: '秘书'
      },
      {
        name: '保安'
      }
    ],
    createTime: 1653315496000
  },
  {
    id: 6,
    avatar: 'http://127.0.0.1:7001/public/upload/20220422/1650604284430.png',
    nickname: '你的Maya',
    email: '877880098@qq.com',
    mobile: '18684868151',
    status: '1',
    roles: [
      {
        name: '董事长'
      },
      {
        name: '经理'
      },
      {
        name: '秘书'
      },
      {
        name: '保安'
      }
    ],
    createTime: 1653315496000
  },
  {
    id: 7,
    avatar: 'http://127.0.0.1:7001/public/upload/20220422/1650604284430.png',
    nickname: '你的Maya',
    email: '877880098@qq.com',
    mobile: '18684868151',
    status: '1',
    roles: [
      {
        name: '董事长'
      },
      {
        name: '经理'
      },
      {
        name: '秘书'
      },
      {
        name: '保安'
      }
    ],
    createTime: 1653315496000
  },
  {
    id: 8,
    avatar: 'http://127.0.0.1:7001/public/upload/20220422/1650604284430.png',
    nickname: '你的Maya',
    email: '877880098@qq.com',
    mobile: '18684868151',
    status: '1',
    roles: [
      {
        name: '董事长'
      },
      {
        name: '经理'
      },
      {
        name: '秘书'
      },
      {
        name: '保安'
      }
    ],
    createTime: 1653315496000
  }
])
// 编辑
const edit = (row) => {
  Form = row
  dialogTitle.value = '编辑'
  dialogVisible.value = true
}
// 新增
const add = (row) => {
  Form = row
  dialogTitle.value = '新增'
  dialogVisible.value = true
}
// 删除
const del = (ids) => {
  if (!ids.length) {
    ElMessage({
      message: '请选择要删除的选中项',
      type: 'warning'
    })
    return
  }
  ElMessageBox.confirm('是否删除所选中数据？', '系统提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    draggable: true
  })
    .then(() => {
      console.log(1)

      ElMessage({
        type: 'success',
        message: 'Delete completed'
      })
    })
    .catch(() => {
      console.log(2)

      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
  console.log(ids)
}
// 多选表格数据
const delBtnDisabled = ref(true)
let selectableList = reactive([])
const selectable = (selection) => {
  selectableList = selection
  delBtnDisabled.value = selectableList.length > 0 ? false : true
  console.log(selectableList)
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
  nickname: null,
  email: null,
  mobile: null
})
const value1 = ref<[Date, Date]>([new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)])
const resetSearchForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  searchForm = reactive({
    nickname: null,
    email: null,
    mobile: null
  })
  formEl.resetFields()
}
// 对话框
const dialogVisible = ref(false)
const closeDialog = () => {
  dialogVisible.value = false
  console.log('closeDialog')
}
const dialogTitle = ref('')
// 对话框表单
import type { FormInstance, FormRules } from 'element-plus'
const FormRef = ref<FormInstance>()
let Form = reactive({
  id: null,
  nickname: null,
  email: null,
  mobile: null,
  status: null,
  createTime: null
})
const Rules = reactive<FormRules>({
  nickname: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
  mobile: [{ required: true, message: '请输入手机', trigger: 'blur' }]
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
const disable = async (row) => {
  const { id, status } = row
  // const res = await editUser(id, { status: status });
  // this.$message.success(`${status ? "该用户状态设置为正常" : "已拉黑该用户，并已限制该用户登录"}`);
}
</script>
<template>
  <div class="container">
    <!-- 搜索 -->
    <el-card class="box-card">
      <el-form ref="searchFormRef" :model="searchForm" label-width="80px" status-icon>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="昵称"
              ><el-input v-model="searchForm.nickname" placeholder="请输入昵称"
            /></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="邮箱"
              ><el-input v-model="searchForm.email" placeholder="请输入邮箱"
            /></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机"
              ><el-input v-model="searchForm.mobile" placeholder="请输入手机"
            /></el-form-item>
          </el-col>
        </el-row>
        <el-button icon="Search" type="primary" plain>搜索</el-button>
        <el-button icon="Refresh" plain @click="resetSearchForm(searchFormRef)">重置</el-button>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="box-card">
      <!-- 功能区域 -->
      <div style="display: flex; justify-content: space-between; margin: 0px 15px 15px 15px">
        <div>
          <el-button icon="Plus" type="primary" plain @click="add">新增</el-button>
          <el-button icon="EditPen" type="success" plain>修改</el-button>
          <el-button icon="Delete" type="danger" plain :disabled="delBtnDisabled" @click="del([])"
            >删除</el-button
          >
          <el-button icon="Bottom" type="info" plain>导出</el-button>
        </div>
        <div>
          <el-tooltip class="box-item" effect="light" content="隐藏/显示 搜索" placement="top"
            ><el-button icon="Search" circle></el-button
          ></el-tooltip>
          <el-tooltip class="box-item" effect="light" content="刷新" placement="top"
            ><el-button icon="Refresh" circle></el-button
          ></el-tooltip>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" @selection-change="selectable">
        <el-table-column align="center" width="40px" type="selection" />
        <el-table-column prop="id" label="编号" align="center" width="50px" />
        <el-table-column prop="type" label="头像" width="70px">
          <template #default="scope">
            <!-- <el-image style="width: 50px; height: 50px" :preview-src-list="[scope.row.avatar]" :src="scope.row.avatar"></el-image> -->
            <img :src="scope.row.avatar" style="width: 50px; height: 50px" />
          </template>
        </el-table-column>
        <el-table-column prop="nickname" label="昵称" align="center" show-overflow-tooltip />
        <el-table-column prop="email" label="邮箱" align="center" show-overflow-tooltip />
        <el-table-column prop="mobile" label="手机" align="center" show-overflow-tooltip />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-switch v-model="scope.row.status" @change="disable(scope.row)"> </el-switch>
            <!-- <el-tag type="success" v-if="slot.row.status">正常</el-tag>
						<el-tag v-else>限制</el-tag> -->
          </template>
        </el-table-column>
        <el-table-column prop="roles" label="角色">
          <template #default="scope">
            <el-tag
              v-for="(item, index) in scope.row.roles"
              :key="index"
              type="success"
              style="margin: 3px"
              >{{ item.name }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" align="center" width="140" />
        <el-table-column label="操作" fixed="right" align="center" width="140">
          <template #default="scope">
            <el-button type="primary" link @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" link @click="del([scope.row.id])">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <div style="margin: 15px; box-sizing: border-box">
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
        <el-form-item label="昵称" prop="nickname"
          ><el-input v-model="Form.nickname" placeholder="请输入昵称"
        /></el-form-item>
        <el-form-item label="邮箱" prop="email"
          ><el-input v-model="Form.email" placeholder="请输入邮箱"
        /></el-form-item>
        <el-form-item label="手机" prop="message"
          ><el-input v-model="Form.mobile" placeholder="请输入手机"
        /></el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="Form.status" @change="disable(Form)"> </el-switch>
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
