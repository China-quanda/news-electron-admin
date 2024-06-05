<script setup lang="ts">
defineOptions({
  name: 'Config'
})
import {
  ConfigEntity,
  QueryConfigDto,
  addDmConfig,
  deleteManyDmConfig,
  getDmConfig,
  patchDmConfig
} from '@/api/system/dm/config'
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
// 查询
const query = ref<QueryConfigDto>({
  pageNum: 1,
  pageSize: 10,
  type: true,
  value: '',
  key: '',
  name: '',
  startTime: '',
  endTime: ''
})
// 总数
const total = ref(0)
// 开始时间和结束时间
const searchDate = ref<string[]>([])
// 是否显示搜索表单
const isShowSearchForm = ref(true)
// 搜索表单 Ref
const searchFormRef = ref<FormInstance>()
// 表格数据
const tableData = ref<ConfigEntity[]>([])
// 多选表格数据
const selectableList = ref<ConfigEntity[]>([])
// 是否显示 新增 编辑 对话框
const isShowFormDialog = ref(false)
// 新增 编辑 对话框中表单 ref
const configFormRef = ref<FormInstance>()
// 对话框表单
const configForm = ref<ConfigEntity>({
  id: 0,
  createTime: '',
  updateTime: '',
  type: false,
  remark: '',
  value: '',
  name: '',
  key: ''
})
// 对话框中新增编辑表单验证规则
const configRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入参数名称', trigger: 'blur' }],
  key: [{ required: true, message: '请输入参数键名', trigger: 'blur' }],
  value: [{ required: true, message: '请输入参数键值', trigger: 'blur' }]
})

// 加载数据字典列表
const loadDmConfig = () => {
  getDmConfig(query.value).then(({ list, pagination }) => {
    tableData.value = list
    query.value.pageNum = pagination.pageNum
    query.value.pageSize = pagination.pageSize
    total.value = pagination.total
  })
}
// 选择表格时触发
const selectable = (selection: ConfigEntity[]) => {
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

const searchDateChange = (list: string[]) => {
  if (!list?.length) {
    query.value.startTime = ''
    query.value.endTime = ''
  } else {
    query.value.startTime = list[0]
    query.value.endTime = list[1]
  }
  loadDmConfig()
}

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

  await deleteManyDmConfig(ids)
  loadDmConfig()

  ElMessage({
    type: 'success',
    message: 'Delete completed'
  })
}
// 关闭 新增 编辑 对话框
const closeconfigFormDialog = () => {
  resetForm(configFormRef.value) // 没有清空表单
  configForm.value = {
    id: 0,
    createTime: '',
    updateTime: '',
    type: false,
    remark: '',
    value: '',
    name: '',
    key: ''
  }
  isShowFormDialog.value = false
}
// 添加 and 编辑 数据
const operation = (type: string, row?: ConfigEntity) => {
  // if (type === 'add') { }
  if (type === 'edit' && row?.id) {
    configForm.value = row
  }
  if (type === 'edit' && !row?.id) {
    configForm.value = selectableList.value[0]
  }
  isShowFormDialog.value = true
}
// 提交修改数据
const submitconfigForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      if (configForm.value.id) {
        await patchDmConfig(configForm.value.id, configForm.value)
      } else {
        await addDmConfig(configForm.value)
      }
      closeconfigFormDialog()
      loadDmConfig()
    }
  })
}
</script>
<template>
  <div class="container">
    <!-- 搜索 -->
    <el-card v-show="isShowSearchForm" class="box-card">
      <el-form ref="searchFormRef" :model="query" label-width="80px" status-icon>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="参数名称" prop="name"
              ><el-input
                v-model="query.name"
                placeholder="参数名称"
                clearable
                @clear="loadDmConfig"
            /></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="参数键名" prop="key"
              ><el-input v-model="query.key" placeholder="参数键名" clearable @clear="loadDmConfig"
            /></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="系统内置" prop="type">
              <el-select
                v-model="query.type"
                clearable
                placeholder="系统内置"
                @clear="loadDmConfig"
              >
                <el-option label="是" :value="true" />
                <el-option label="否" :value="false" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="创建时间" prop="searchDate">
              <el-date-picker
                v-model="searchDate"
                type="daterange"
                clearable
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD"
                @change="searchDateChange"
              />
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
          <el-button icon="EditPen" type="danger" plain>刷新缓存</el-button>
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
        <el-table-column align="center" width="40" type="selection" />
        <el-table-column prop="id" label="编号" align="center" width="70" />
        <el-table-column prop="name" label="参数名称" align="center" show-overflow-tooltip />
        <el-table-column prop="key" label="参数键名" align="center" show-overflow-tooltip />
        <el-table-column prop="value" label="参数键值" align="center" show-overflow-tooltip />
        <el-table-column prop="type" label="系统内置" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.type">是</el-tag>
            <el-tag v-else type="info">否</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip />
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
      :title="configForm.id ? '编辑' : '新增' + '数据字典'"
      width="500px"
      draggable
      @close="closeconfigFormDialog"
    >
      <el-form
        ref="configFormRef"
        :model="configForm"
        :rules="configRules"
        label-width="80px"
        status-icon
      >
        <el-form-item label="参数名称" prop="name">
          <el-input v-model="configForm.name" placeholder="请输入参数名称" />
        </el-form-item>
        <el-form-item label="参数键名" prop="key">
          <el-input v-model="configForm.key" placeholder="请输入参数键名" />
        </el-form-item>
        <el-form-item label="参数键值" prop="value">
          <el-input v-model="configForm.value" placeholder="请输入参数键值" />
        </el-form-item>
        <el-form-item label="系统内置" prop="type">
          <el-radio-group v-model="configForm.type">
            <el-radio :value="true">是</el-radio>
            <el-radio :value="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="configForm.remark" type="textarea" placeholder="请输入内容"
        /></el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitconfigForm(configFormRef)">确定</el-button>
          <el-button @click="closeconfigFormDialog">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
