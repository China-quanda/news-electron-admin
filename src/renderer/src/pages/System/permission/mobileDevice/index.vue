<script setup lang="ts">
import {
  mobileDeviceEntity,
  QuerymobileDeviceDto,
  getPermissionMobileDevice,
  deleteManyPermissionMobileDevice,
  patchPermissionMobileDevice
} from '@/api/system/permission/mobileDevice'
import type { FormInstance } from 'element-plus'
defineOptions({
  name: 'MobileDevice'
})
// 查询
const query = ref<QuerymobileDeviceDto>({
  pageNum: 1,
  pageSize: 10,
  username: '',
  deviceNo: '',
  depId: undefined,
  status: undefined
})
// 总数
const total = ref(0)
// 是否显示搜索表单
const isShowSearchForm = ref(true)
// 搜索表单 Ref
const searchFormRef = ref<FormInstance>()
// 表格数据
const tableData = ref<mobileDeviceEntity[]>([])
// 多选表格数据
const selectableList = ref<mobileDeviceEntity[]>([])

// 加载数据字典列表
const loadMobileDevice = () => {
  getPermissionMobileDevice(query.value).then(({ list, pagination }) => {
    tableData.value = list
    query.value.pageNum = pagination.pageNum
    query.value.pageSize = pagination.pageSize
    total.value = pagination.total
  })
}
// 选择表格时触发
const selectable = (selection: mobileDeviceEntity[]) => {
  selectableList.value = selection
}
// 分页页数变化
const handleSizeChange = (val: number) => {
  query.value.pageSize = val
  loadMobileDevice()
}
// 分页页码变化
const handlePageChange = (val: number) => {
  query.value.pageNum = val
  loadMobileDevice()
}
// 重置搜索表单
const resetSearchForm = () => {
  resetForm(searchFormRef.value)
  loadMobileDevice()
}
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
// 初始化
onMounted(() => {
  loadMobileDevice()
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

  await deleteManyPermissionMobileDevice(ids)
  loadMobileDevice()

  ElMessage({
    type: 'success',
    message: 'Delete completed'
  })
}

// 更改状态
const handleStatusChange = async (row: mobileDeviceEntity) => {
  await patchPermissionMobileDevice(row.id, { status: row.status })
  loadMobileDevice()
}
</script>
<template>
  <div class="container">
    <!-- 搜索 -->
    <el-card class="box-card" v-show="isShowSearchForm">
      <el-form ref="searchFormRef" :model="query" label-width="80px" status-icon>
        <el-row :gutter="20">
          <el-col :span="6">
            <el-form-item label="用户名" prop="username"
              ><el-input
                v-model="query.username"
                placeholder="用户名"
                clearable
                @clear="loadMobileDevice"
            /></el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="设备编号" prop="deviceNo">
              <el-input
                v-model="query.deviceNo"
                placeholder="设备编号"
                clearable
                @clear="loadMobileDevice"
            />
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="选择部门" prop="depId">
              <!-- <el-tree-select
                v-model="query.depId"
                :data="categoryOptions"
                :props="treeProps"
                check-strictly
                placeholder="请选择上级行政区域"
              /> -->
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态" prop="status">
              <el-select
                v-model="query.status"
                clearable
                placeholder="请选择状态"
                @clear="loadMobileDevice"
              >
                <el-option label="准入" :value="true" />
                <el-option label="未准入" :value="false" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-button icon="Search" type="primary" plain @click="loadMobileDevice">搜索</el-button>
        <el-button icon="Refresh" plain @click="resetSearchForm()">重置</el-button>
      </el-form>
    </el-card>
    <!-- 表格 -->
    <el-card class="box-card">
      <!-- 功能区域 -->
      <div style="display: flex; justify-content: space-between; margin-bottom: 15px">
        <div>
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
            ><el-button icon="Refresh" circle @click="loadMobileDevice"></el-button
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
      <el-table :data="tableData" border @selection-change="selectable">
        <el-table-column align="center" type="selection" width="40" />
        <el-table-column prop="username" label="姓名" width="160" show-overflow-tooltip />
        <el-table-column prop="depId" label="所属部门" align="center" width="160"/>
        <el-table-column prop="deviceNo" label="设备编号" align="center" show-overflow-tooltip />
        <el-table-column prop="deviceBrand" label="设备品牌" align="center" width="140" show-overflow-tooltip/>
        <el-table-column prop="status" label="状态" align="center" width="70">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="true"
              :inactive-value="false"
              @change="handleStatusChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="准入时间" align="center" width="190" show-overflow-tooltip/>
        <el-table-column prop="createTime" label="最后访问时间" align="center" width="190" show-overflow-tooltip/>
        <el-table-column label="操作" fixed="right" align="center" width="120">
          <template #default="scope">
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
  </div>
</template>

<style scoped lang="scss"></style>
