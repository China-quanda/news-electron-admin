<script setup lang="ts">
defineOptions({
  name: 'Dict'
})
import {
  IDictListItem,
  IDictListQuery,
  addDmDict,
  deleteManyDmDict,
  getDmDict,
  patchDmDict
} from '@/api/system/dm/dict'
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
const router = useRouter()

// 查询
const query = ref<IDictListQuery>({
  pageNum: 1,
  pageSize: 10,
  status: true,
  name: '',
  type: ''
})
// 总数
const total = ref(0)
// 是否显示搜索表单
const isShowSearchForm = ref(true)
// 搜索表单 Ref
const searchFormRef = ref<FormInstance>()
// 表格数据
const tableData = ref<IDictListItem[]>([])
// 多选表格数据
const selectableList = ref<IDictListItem[]>([])
// 是否显示 新增 编辑 对话框
const isShowDictFormDialog = ref(false)
// 新增 编辑 对话框中表单 ref
const dictFormRef = ref<FormInstance>()
// 对话框表单
const dictForm = ref<IDictListItem>({
  id: 0,
  name: '',
  type: '',
  remark: '',
  status: true,
  createTime: '',
  updateTime: ''
})
// 对话框中新增编辑表单验证规则
const dictRules = reactive<FormRules>({
  name: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
  type: [{ required: true, message: '请输入字典类型', trigger: 'blur' }],
  status: [{ required: true, message: '请选择字典状态', trigger: 'blur' }]
})

// 加载数据字典列表
const loadDmDict = () => {
  getDmDict(query.value).then(({ list, pagination }) => {
    tableData.value = list
    query.value.pageNum = pagination.pageNum
    query.value.pageSize = pagination.pageSize
    total.value = pagination.total
  })
}
// 选择表格时触发
const selectable = (selection: IDictListItem[]) => {
  selectableList.value = selection
}
// 分页页数变化
const handleSizeChange = (val: number) => {
  query.value.pageSize = val
  loadDmDict()
}
// 分页页码变化
const handlePageChange = (val: number) => {
  query.value.pageNum = val
  loadDmDict()
}
// 重置搜索表单
const resetSearchForm = () => {
  resetForm(searchFormRef.value)
  loadDmDict()
}
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 去数据字段页面
const toDictDataPage = (row: IDictListItem) => {
  router.push({
    path: '/system/dm/dictData',
    query: { dictId: row.id, dictType: row.type }
  })
}
// 初始化
onMounted(() => {
  loadDmDict()
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

  await deleteManyDmDict(ids)
  loadDmDict()

  ElMessage({
    type: 'success',
    message: 'Delete completed'
  })
}
// 关闭 新增 编辑 对话框
const closeDictFormDialog = () => {
  resetForm(dictFormRef.value) // 没有清空表单
  dictForm.value = {
    id: 0,
    name: '',
    type: '',
    remark: '',
    status: true,
    createTime: '',
    updateTime: ''
  }
  isShowDictFormDialog.value = false
}
// 添加 and 编辑 数据
const operation = (type: string, row?: IDictListItem) => {
  // if (type === 'add') { }
  if (type === 'edit' && row?.id) {
    dictForm.value = row
  }
  if (type === 'edit' && !row?.id) {
    dictForm.value = selectableList.value[0]
  }
  isShowDictFormDialog.value = true
}
// 提交修改数据
const submitDictForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      if (dictForm.value.id) {
        await patchDmDict(dictForm.value.id, dictForm.value)
      } else {
        await addDmDict(dictForm.value)
      }
      closeDictFormDialog()
      loadDmDict()
    }
  })
}
</script>
<template>
  <div class="container">
    <!-- 搜索表单 -->
    <el-card v-show="isShowSearchForm" class="box-card">
      <el-form ref="searchFormRef" :model="query" label-width="80px" status-icon>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="字典名称" prop="name"
              ><el-input v-model="query.name" clearable @clear="loadDmDict"
            /></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="字典类型" prop="type"
              ><el-input v-model="query.type" clearable @clear="loadDmDict"
            /></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="字典状态">
              <el-select
                v-model="query.status"
                clearable
                placeholder="请选择状态"
                @clear="loadDmDict"
              >
                <el-option label="开启" :value="true" />
                <el-option label="关闭" :value="false" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button icon="Search" type="primary" plain @click="loadDmDict">搜索</el-button>
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
            ><el-button icon="Refresh" circle @click="loadDmDict"></el-button
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
        <el-table-column prop="name" label="字典名称" align="center" show-overflow-tooltip />
        <el-table-column prop="type" label="字典类型" align="center" show-overflow-tooltip />
        <el-table-column prop="remark" label="字典备注" align="center" show-overflow-tooltip />
        <el-table-column prop="status" label="字典状态" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.status">开启</el-tag>
            <el-tag v-else type="info">关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="300">
          <template #default="scope">
            <el-button type="success" text bg @click="toDictDataPage(scope.row)"
              >字典数据</el-button
            >
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
      v-model="isShowDictFormDialog"
      :title="dictForm.id ? '编辑' : '新增' + '数据字典'"
      width="500px"
      draggable
      @close="closeDictFormDialog"
    >
      <el-form
        ref="dictFormRef"
        :model="dictForm"
        :rules="dictRules"
        label-width="80px"
        status-icon
      >
        <el-form-item label="字典名称" prop="name"
          ><el-input v-model="dictForm.name"
        /></el-form-item>
        <el-form-item label="字典类型" prop="type"
          ><el-input v-model="dictForm.type"
        /></el-form-item>
        <el-form-item label="字典状态" prop="status">
          <el-radio-group v-model="dictForm.status">
            <el-radio :value="true">开启</el-radio>
            <el-radio :value="false">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="字典备注" prop="dictForm.type"
          ><el-input v-model="dictForm.remark" type="textarea"
        /></el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitDictForm(dictFormRef)">确定</el-button>
          <el-button @click="closeDictFormDialog">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
