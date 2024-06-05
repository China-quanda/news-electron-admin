<script setup lang="ts">
import {
  NoticeEntity,
  QueryNoticeDto,
  addDmNotice,
  getDmNotice,
  deleteManyDmNotice,
  patchDmNotice
} from '@/api/system/message/notice'
import type { FormInstance, FormRules } from 'element-plus'
defineOptions({
  name: 'Config'
})
// 查询
const query = ref<QueryNoticeDto>({
  pageNum: 1,
  pageSize: 10,
  status: undefined,
  title: '',
  type: undefined
})
// 总数
const total = ref(0)
// 是否显示搜索表单
const isShowSearchForm = ref(true)
// 搜索表单 Ref
const searchFormRef = ref<FormInstance>()
// 表格数据
const tableData = ref<NoticeEntity[]>([])
// 多选表格数据
const selectableList = ref<NoticeEntity[]>([])
// 是否显示 新增 编辑 对话框
const isShowFormDialog = ref(false)
// 新增 编辑 对话框中表单 ref
const formRef = ref<FormInstance>()
// 对话框表单
const form = ref<NoticeEntity>({
  id: 0,
  createTime: '',
  updateTime: '',
  title: '',
  content: '',
  status: true,
  type: 1
})
// 对话框中新增编辑表单验证规则
const rules = reactive<FormRules>({
  title: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入公告内容', trigger: 'blur' }],
  type: [{ required: true, message: '请选择公告类型', trigger: 'blur' }]
})

// 加载数据字典列表
const loadDmConfig = () => {
  getDmNotice(query.value).then(({ list, pagination }) => {
    tableData.value = list
    query.value.pageNum = pagination.pageNum
    query.value.pageSize = pagination.pageSize
    total.value = pagination.total
  })
}
// 选择表格时触发
const selectable = (selection: NoticeEntity[]) => {
  selectableList.value = selection
}
// 分页页数变化
const handleSizeChange = (val: number) => {
  query.value.pageSize = val
  loadDmConfig()
}
// 分页页码变化
const handlePageChange = (val: number) => {
  query.value.pageNum = val
  loadDmConfig()
}
// 重置搜索表单
const resetSearchForm = () => {
  resetForm(searchFormRef.value)
  loadDmConfig()
}
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 初始化
onMounted(() => {
  loadDmConfig()
})

// 删除数据
const del = async (ids: number[]) => {
  if (!ids.length) {
    ids = selectableList.value.map((item) => item.id)
  }
  await ElMessageBox.confirm('是否删除所选中数据？', '系统提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning',
    draggable: true
  })

  await deleteManyDmNotice(ids)
  loadDmConfig()

  ElMessage({
    type: 'success',
    message: 'Delete completed'
  })
}
// 关闭 新增 编辑 对话框
const closeformDialog = () => {
  resetForm(formRef.value) // 没有清空表单
  form.value = {
    id: 0,
    createTime: '',
    updateTime: '',
    title: '',
    content: '',
    status: true,
    type: 1
  }
  isShowFormDialog.value = false
}
// 添加 and 编辑 数据
const operation = (type: string, row?: NoticeEntity) => {
  // if (type === 'add') { }
  if (type === 'edit' && row?.id) {
    form.value = row
  }
  if (type === 'edit' && !row?.id) {
    form.value = selectableList.value[0]
  }
  isShowFormDialog.value = true
}
// 提交修改数据
const submitform = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      if (form.value.id) {
        await patchDmNotice(form.value.id, form.value)
      } else {
        await addDmNotice(form.value)
      }
      closeformDialog()
      loadDmConfig()
    }
  })
}
</script>
<template>
  <div class="container">
    <!-- 搜索 -->
    <el-card class="box-card" v-show="isShowSearchForm">
      <el-form ref="searchFormRef" :model="query" label-width="80px" status-icon>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="公告标题" prop="title"
              ><el-input
                v-model="query.title"
                placeholder="请输入标题"
                clearable
                @clear="loadDmConfig"
            /></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="公告类型" prop="type">
              <el-select
                v-model="query.type"
                clearable
                placeholder="请选择类型"
                @clear="loadDmConfig"
              >
                <el-option label="公告" :value="1" />
                <el-option label="通知" :value="2" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="公告状态" prop="status">
              <el-select
                v-model="query.status"
                clearable
                placeholder="请选择状态"
                @clear="loadDmConfig"
              >
                <el-option label="开启" :value="true" />
                <el-option label="关闭" :value="false" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button icon="Search" type="primary" plain @click="loadDmConfig">搜索</el-button>
        <el-button icon="Refresh" plain @click="resetSearchForm()">重置</el-button>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="box-card">
      <!-- 功能区域 -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 15px">
        <div>
          <el-button
            icon="Plus"
            type="primary"
            plain
            :disabled="selectableList.length !== 0"
            @click="operation('add')"
            >新增</el-button
          >
          <el-button
            icon="EditPen"
            type="success"
            plain
            :disabled="selectableList.length !== 1"
            @click="operation('edit')"
            >修改</el-button
          >
          <el-button
            icon="Delete"
            type="danger"
            plain
            :disabled="!selectableList.length"
            @click="del([])"
            >删除</el-button
          >
          <el-button icon="Bottom" type="info" plain>导出</el-button>
        </div>
        <div>
          <el-tooltip
            class="box-item"
            :content="isShowSearchForm ? '隐藏搜索 ' : '显示搜索'"
            placement="top"
            ><el-button
              icon="Search"
              circle
              @click="isShowSearchForm = !isShowSearchForm"
            ></el-button
          ></el-tooltip>
          <el-tooltip class="box-item" content="刷新" placement="top"
            ><el-button icon="Refresh" circle @click="loadDmConfig"></el-button
          ></el-tooltip>
        </div>
      </div>
      <!-- 选择提示 -->
      <el-alert
        v-if="selectableList.length"
        :title="'已选择' + selectableList.length + '条数据'"
        type="info"
        show-icon
        style="margin: 10px 0px"
      ></el-alert>
      <el-table :data="tableData" style="width: 100%" @selection-change="selectable">
        <el-table-column align="center" width="40px" type="selection" />
        <el-table-column prop="id" label="编号" align="center" width="70" />
        <el-table-column prop="title" label="公告标题" align="center" show-overflow-tooltip />
        <el-table-column prop="type" label="公告类型" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.type == 1" type="primary">公告</el-tag>
            <el-tag v-if="scope.row.type == 2" type="success">通知</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="公告状态" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.status" type="primary">开启</el-tag>
            <el-tag v-else type="success">关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center" width="140" />
        <el-table-column label="操作" fixed="right" align="center" width="200">
          <template #default="scope">
            <el-button type="primary" icon="Edit" text bg @click="operation('edit', scope.row)"
              >编辑</el-button
            >
            <el-button type="danger" icon="Delete" text bg @click="del([scope.row.id])"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 分页 -->
    <div style="margin: 15px; box-sizing: border-box">
      <el-pagination
        v-model:current-page="query.pageNum"
        v-model:page-size="query.pageSize"
        :page-sizes="[10, 20, 30, 50]"
        :total="total"
        background
        layout="sizes,prev, pager, next,jumper,total"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>
    <!-- 对话框 -->
    <el-dialog
      v-model="isShowFormDialog"
      :title="form.id ? '编辑' : '新增' + '数据字典'"
      width="500px"
      draggable
      @close="closeformDialog"
    >
      <el-form ref="formRef" :model="form" :rules="rules" label-width="80px" status-icon>
        <el-form-item label="公告标题" prop="title"><el-input v-model="form.title" /></el-form-item>
        <el-form-item label="公告内容" prop="content"><el-input v-model="form.content" type="textarea" /></el-form-item>
        <el-form-item label="公告类型" prop="type">
          <el-select v-model="form.type" clearable placeholder="请选择类型">
            <el-option label="通知" :value="1" />
            <el-option label="公告" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="公告状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="true">开启</el-radio>
            <el-radio :label="false">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitform(formRef)">确定</el-button>
          <el-button @click="closeformDialog">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
