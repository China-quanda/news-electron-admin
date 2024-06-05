<script setup lang="ts">
defineOptions({
  name: 'DictData'
})
import {
  DictDataItem,
  DictDataQuery,
  ObjectWithArrayProps,
  addDmDictData,
  deleteManyDmDictData,
  getDmDictData,
  getSystemDictDatas,
  patchDmDictData
} from '@/api/system/dm/dictData'
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useRoute } from 'vue-router'
const route = useRoute()
// 查询
const query = ref<DictDataQuery>({
  dictType: '',
  pageNum: 1,
  pageSize: 10,
  status: true,
  label: ''
})
// 总数
const total = ref(0)
// 数据字典数据
const systemDictDatas = ref<ObjectWithArrayProps>()
// 是否显示搜索表单
const isShowSearchForm = ref(true)
// 搜索表单 Ref
const searchFormRef = ref<FormInstance>()
// 表格数据
const tableData = ref<DictDataItem[]>([])
// 多选表格数据
const selectableList = ref<DictDataItem[]>([])
// 是否显示 新增 编辑 对话框
const isShowDictDataFormDialog = ref(false)
// 新增 编辑 对话框中表单 ref
const dictDataFormRef = ref<FormInstance>()
// 对话框表单
const dictDataForm = ref<DictDataItem>({
  id: 0,
  label: '',
  value: '',
  class: '',
  sort: 0,
  dictId: 0,
  colorType: '',
  remark: '',
  status: true,
  createTime: '',
  updateTime: ''
})
// 对话框中新增编辑表单验证规则
const dictDataRules = reactive<FormRules>({
  label: [{ required: true, message: '请输入字典标签', trigger: 'blur' }],
  value: [{ required: true, message: '请输入字典键值', trigger: 'blur' }],
  status: [{ required: true, message: '请选择字典状态', trigger: 'blur' }]
})

// 加载数据字典列表
const loadDmDictData = () => {
  getDmDictData(query.value).then(({ list, pagination }) => {
    tableData.value = list
    query.value.pageNum = pagination.pageNum
    query.value.pageSize = pagination.pageSize
    total.value = pagination.total
  })
}
// 选择表格时触发
const selectable = (selection: DictDataItem[]) => {
  selectableList.value = selection
}
// 分页页数变化
const handleSizeChange = (val: number) => {
  query.value.pageSize = val
  loadDmDictData()
}
// 分页页码变化
const handlePageChange = (val: number) => {
  query.value.pageNum = val
  loadDmDictData()
}
// 重置搜索表单
const resetSearchForm = () => {
  resetForm(searchFormRef.value)
  loadDmDictData()
}
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 初始化
onMounted(async () => {
  dictDataForm.value.dictId = Number(route.query.dictId)
  query.value.dictType = route.query.dictType as string
  loadDmDictData()

  systemDictDatas.value = await getSystemDictDatas(['system_color_type'])
  systemDictDatas.value.system_color_type[0]
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

  await deleteManyDmDictData(ids)
  loadDmDictData()

  ElMessage({
    type: 'success',
    message: 'Delete completed'
  })
}
// 关闭 新增 编辑 对话框
const closeDictDataFormDialog = () => {
  // resetForm(dictDataFormRef.value) // 没有清空表单
  dictDataForm.value = {
    id: 0,
    label: '',
    value: '',
    class: '',
    sort: 0,
    dictId: Number(route.query.dictId),
    colorType: '',
    remark: '',
    status: true,
    createTime: '',
    updateTime: ''
  }
  isShowDictDataFormDialog.value = false
}
// 添加 and 编辑 数据
const operation = (type: string, row?: DictDataItem) => {
  // if (type === 'add') { }
  if (type === 'edit' && row?.id) {
    dictDataForm.value = row
  }
  if (type === 'edit' && !row?.id) {
    dictDataForm.value = selectableList.value[0]
  }
  isShowDictDataFormDialog.value = true
}
// 提交修改数据
const submitdictDataForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      if (dictDataForm.value.id) {
        await patchDmDictData(dictDataForm.value.id, dictDataForm.value)
      } else {
        await addDmDictData(dictDataForm.value)
      }
      closeDictDataFormDialog()
      loadDmDictData()
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
            <el-form-item label="字典标签" prop="label"
              ><el-input v-model="query.label" clearable @clear="loadDmDictData"
            /></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="字典状态" prop="status">
              <el-select
                v-model="query.status"
                clearable
                placeholder="请选择状态"
                @clear="loadDmDictData"
              >
                <el-option label="开启" :value="true" />
                <el-option label="关闭" :value="false" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button icon="Search" type="primary" plain @click="loadDmDictData">搜索</el-button>
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
            ><el-button icon="Refresh" circle @click="loadDmDictData"></el-button
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
        <el-table-column prop="label" label="字典标签" align="center" show-overflow-tooltip />
        <el-table-column prop="value" label="字典键值" align="center" show-overflow-tooltip />
        <el-table-column prop="sort" label="字典排序" align="center" show-overflow-tooltip />
        <!-- <el-table-column prop="remark" label="颜色类型" show-overflow-tooltip /> -->
        <el-table-column prop="remark" label="备注" align="center" show-overflow-tooltip />
        <el-table-column prop="status" label="字典状态" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.status">开启</el-tag>
            <el-tag v-else type="info">关闭</el-tag>
          </template>
        </el-table-column>
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
      v-model="isShowDictDataFormDialog"
      :title="dictDataForm.id ? '编辑' : '新增' + '数据字典'"
      width="500px"
      draggable
      @close="closeDictDataFormDialog"
    >
      <el-form
        ref="dictDataFormRef"
        :model="dictDataForm"
        :rules="dictDataRules"
        label-width="80px"
        status-icon
      >
        <el-form-item label="字典类型">
          <el-input v-model="query.dictType" disabled />
        </el-form-item>
        <el-form-item label="字典标签" prop="label">
          <el-input v-model="dictDataForm.label" placeholder="请输入字典标签" />
        </el-form-item>
        <el-form-item label="字典键值" prop="value">
          <el-input v-model="dictDataForm.value" placeholder="请输入字典键值" />
        </el-form-item>
        <el-form-item label="css Class" prop="class">
          <el-input v-model="dictDataForm.class" placeholder="请输入Class" />
        </el-form-item>
        <el-form-item label="颜色类型" prop="colorType">
          <el-select v-model="dictDataForm.colorType" clearable placeholder="请选择颜色类型">
            <el-option
              v-for="item in systemDictDatas!.system_color_type"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="字典排序" prop="sort">
          <el-input-number v-model="dictDataForm.sort" :min="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="字典状态" prop="status">
          <el-radio-group v-model="dictDataForm.status">
            <el-radio :value="true">开启</el-radio>
            <el-radio :value="false">关闭</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="字典备注">
          <el-input v-model="dictDataForm.remark" type="textarea" placeholder="请输入字典备注"
        /></el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="submitdictDataForm(dictDataFormRef)">确定</el-button>
          <el-button @click="closeDictDataFormDialog">取消</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss"></style>
