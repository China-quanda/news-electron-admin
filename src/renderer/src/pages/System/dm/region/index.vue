<script setup lang="ts">
defineOptions({
  name: 'DictData'
})
import {
  RegionEntity,
  QueryRegionDto,
  addDmRegion,
  deleteManyDmRegion,
  getDmRegion,
  patchDmRegion
} from '@/api/system/dm/region'
import { handleTree } from '@/utils'
import type { FormInstance, FormRules } from 'element-plus'
// 查询
const query = ref<QueryRegionDto>({
  pageNum: 1,
  pageSize: 5000
})
// 总数
const total = ref(0)
// 表格数据
const tableData = ref<RegionEntity[]>([])
// 多选表格数据
const selectableList = ref<RegionEntity[]>([])
// 是否显示 新增 编辑 对话框
const isShowFormDialog = ref(false)
// 新增 编辑 对话框中表单 ref
const formRef = ref<FormInstance>()
// 对话框表单
const form = ref<RegionEntity>({
  id: 0,
  createTime: '',
  updateTime: '',
  parentCode: 0,
  code: 0,
  name: '',
  sort: 0
})
// 是否展开，默认全部不展开
const isExpandAll = ref(false)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkCode = (_rule: any, value: number, callback: any) => {
  if (value === 0 || value === null || !value || String(value).length < 6) {
    callback(new Error('请输入对应行政区域编号'))
  } else {
    callback()
  }
}
// 对话框中新增编辑表单验证规则
const formRules = reactive<FormRules<typeof form>>({
  name: [{ required: true, message: '行政区域名称', trigger: 'blur' }],
  code: [{ required: true, validator: checkCode, trigger: 'blur' }]
})
// 重新渲染表格状态
const refreshTable = ref(true)
/** 展开/折叠操作 */
const toggleExpandAll = () => {
  refreshTable.value = false
  isExpandAll.value = !isExpandAll.value
  nextTick(() => {
    refreshTable.value = true
  })
}
type IcategoryOptions = {
  id: number
  name: string
  code: number
  children: RegionEntity[]
}
// 数据分类树选项
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const categoryOptions = ref<IcategoryOptions[]>([])
const treeProps = {
  id: 'id',
  value: 'code',
  label: 'name',
  children: 'children',
  disabled: 'disabled'
}
/** 查询数据分类下拉树结构 */
const getTreeselect = () => {
  getDmRegion({ pageNum: 1, pageSize: 5000 }).then(({ list }) => {
    categoryOptions.value = []
    categoryOptions.value.push({
      id: 0,
      code: 0,
      name: '中国 🇨🇳',
      children: handleTree(list, 'code', 'parentCode')
    })
  })
}

// 加载数据字典列表
const loadDmCategory = () => {
  getDmRegion(query.value).then(({ list, pagination }) => {
    tableData.value = handleTree(list, 'code', 'parentCode')
    query.value.pageNum = pagination.pageNum
    query.value.pageSize = pagination.pageSize
    total.value = pagination.total
  })
}
// 选择表格时触发
const selectable = (selection: RegionEntity[]) => {
  selectableList.value = selection
}
// 分页页数变化
const handleSizeChange = (val: number) => {
  query.value.pageSize = val
  loadDmCategory()
}
// 分页页码变化
const handlePageChange = (val: number) => {
  query.value.pageNum = val
  loadDmCategory()
}
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 初始化
onMounted(async () => {
  loadDmCategory()
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

  await deleteManyDmRegion(ids)
  loadDmCategory()

  ElMessage({
    type: 'success',
    message: 'Delete completed'
  })
}
// 关闭 新增 编辑 对话框
const closeFormDialog = () => {
  resetForm(formRef.value) // 没有清空表单
  form.value = {
    id: 0,
    createTime: '',
    updateTime: '',
    parentCode: 0,
    code: 0,
    name: '',
    sort: 0
  }
  isShowFormDialog.value = false
}
// 添加 and 编辑 数据
const operation = (type: string, row?: RegionEntity) => {
  getTreeselect()
  if (type === 'add' && row?.id) {
    form.value.parentCode = row?.code
  }
  if (type === 'edit' && row?.id) {
    form.value = row
  }
  if (type === 'edit' && !row?.id) {
    form.value = selectableList.value[0]
  }
  isShowFormDialog.value = true
}

// 提交修改数据
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      if (form.value.id) {
        await patchDmRegion(form.value.id, form.value)
      } else {
        await addDmRegion(form.value)
      }
      closeFormDialog()
      loadDmCategory()
    }
  })
}
</script>
<template>
  <div class="container">
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
          <el-button icon="Switch" type="info" plain @click="toggleExpandAll">{{
            isExpandAll ? '折叠' : '展开'
          }}</el-button>
        </div>
        <div>
          <el-tooltip class="box-item" content="刷新" placement="top"
            ><el-button icon="Refresh" circle @click="loadDmCategory"></el-button
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
      <!-- children -->
      <el-table
        v-if="refreshTable"
        :data="tableData"
        style="width: 100%"
        row-key="id"
        lazy
        :default-expand-all="isExpandAll"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
        @selection-change="selectable"
      >
        <el-table-column align="center" width="40" type="selection" />
        <el-table-column align="center" width="60" type="index" label="编号" />
        <el-table-column prop="name" label="行政区域名称" show-overflow-tooltip />
        <el-table-column prop="code" label="行政区域编号" align="center" width="130" />
        <el-table-column prop="sort" label="排序" align="center" />
        <el-table-column label="操作" fixed="right" align="center" width="300">
          <template #default="scope">
            <el-button type="primary" icon="Plus" text bg @click="operation('add', scope.row)"
              >新增</el-button
            >
            <el-button type="success" icon="Edit" text bg @click="operation('edit', scope.row)"
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
      @close="closeFormDialog"
    >
      <el-form ref="formRef" :model="form" :rules="formRules" label-width="120px" status-icon>
        <el-form-item label="上级行政区域" prop="parentCode">
          <el-tree-select
            v-model="form.parentCode"
            :data="categoryOptions"
            :props="treeProps"
            check-strictly
            placeholder="请选择上级行政区域"
          />
        </el-form-item>
        <el-form-item label="行政区域编号" prop="code">
          <el-input-number v-model="form.code" :min="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="行政区域名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入行政区域名称" />
        </el-form-item>
        <el-form-item label="显示顺序" prop="sort">
          <el-input-number v-model="form.sort" :min="0" controls-position="right" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitForm(formRef)">确定</el-button>
          <el-button @click="closeFormDialog">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
