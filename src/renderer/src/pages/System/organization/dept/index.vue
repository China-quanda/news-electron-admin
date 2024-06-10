<script setup lang="ts">
defineOptions({
  name: 'SystemOrganizationOrg'
})
import {
  DeptEntity,
  QueryDeptDto,
  addOrganizationDept,
  deleteManyOrganizationDept,
  getOrganizationDept,
  getOrganizationDeptById,
  patchOrganizationDept
} from '@/api/system/organization/dept'
import { OrgEntity, QueryOrgDto, getOrganizationOrg } from '@/api/system/organization/org'
import { handleTree } from '@/utils'
import { ElMessage, ElMessageBox, ElTree, type FormInstance, type FormRules } from 'element-plus'
// 查询部门
const query = ref<QueryDeptDto>({
  pageNum: 1,
  pageSize: 1000,
  name: '',
  status: true,
  orgId: 0
})
// 查询机构
const queryOrg = ref<QueryOrgDto>({
  pageNum: 1,
  pageSize: 1000,
  name: '',
  status: true
})
// 总数
const total = ref(0)
// 是否显示搜索表单
const isShowSearchForm = ref(true)
// 搜索表单 Ref
const searchFormRef = ref<FormInstance>()
// 表格数据
const tableData = ref<DeptEntity[]>([])
// 多选表格数据
const selectableList = ref<DeptEntity[]>([])
// 是否显示 新增 编辑 对话框
const isShowFormDialog = ref(false)
// 新增 编辑 对话框中表单 ref
const formRef = ref<FormInstance>()
// 机构树 ref
const treeRef = ref<InstanceType<typeof ElTree>>()
// 机构树 数据列表
const orgList = ref<
  {
    id: number
    name: string
    children: OrgEntity[]
  }[]
>([])
// 部门树 数据列表
const deptList = ref<
  {
    id: number
    name: string
    children: DeptEntity[]
  }[]
>([])
// 树选项
const treeProps = {
  id: 'id',
  value: 'id',
  label: 'name',
  children: 'children',
  disabled: 'disabled'
}
// 对话框表单
const form = ref<DeptEntity>({
  id: 0,
  createTime: '',
  updateTime: '',
  parentId: 0,
  name: '',
  sort: 0,
  leader: '',
  phone: 0,
  email: '',
  status: true,
  orgId: 1
})
// 是否展开，默认全部展开
const isExpandAll = ref(true)
// 对话框中新增编辑表单验证规则
const formRules = reactive<FormRules>({
  name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' }],
  orgId: [{ required: true, message: '所属机构不能为空', trigger: 'blur' }],
  parentId: [{ required: true, message: '上级部门不能为空', trigger: 'blur' }],
  sort: [{ required: true, message: '显示排序不能为空', trigger: 'blur' }],
  email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
  phone: [
    { pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ]
})
// 重新渲染表格状态
const refreshTable = ref(true)
// 监听机构树查询条件变化
watch(queryOrg.value, (n) => {
  treeRef.value!.filter(n.name)
})
/** 展开/折叠操作 */
const toggleExpandAll = () => {
  refreshTable.value = false
  isExpandAll.value = !isExpandAll.value
  nextTick(() => {
    refreshTable.value = true
  })
}
// 机构树节点单击事件
const handleNodeClick = (data) => {
  query.value.orgId = data.id
  loadOrganizationDept()
}
// 筛选机构树节点
const filterNode = (value, data) => {
  if (!value) return true
  return data.name.includes(value)
}
// 加载机构列表
const loadOrganizationOrg = () => {
  getOrganizationOrg(queryOrg.value).then(({ list }) => {
    orgList.value = []
    orgList.value = handleTree(list, 'id', 'parentId')

    query.value.orgId = list[1].id
    loadOrganizationDept()
  })
}
/** 查询数据分类下拉树结构 */
const getTreeselect = (orgId) => {
  getOrganizationDept({
    pageNum: 1,
    pageSize: 1000,
    orgId: orgId
  }).then(({ list }) => {
    deptList.value = []
    // deptList.value = handleTree(list, 'id', 'parentId')
    deptList.value.push({
      id: 0,
      name: '顶级部门',
      children: handleTree(list, 'id', 'parentId')
    })
  })
}
// 加载部门列表
const loadOrganizationDept = () => {
  getOrganizationDept(query.value).then(({ list, pagination }) => {
    tableData.value = handleTree(list, 'id', 'parentId')
    query.value.pageNum = pagination.pageNum
    query.value.pageSize = pagination.pageSize
    total.value = pagination.total
  })
}
/** 机构改变事件 */
const handleOrgChange = (orgId) => {
  form.value.parentId = null
  getTreeselect(orgId)
}
// 选择表格时触发
const selectable = (selection: DeptEntity[]) => {
  selectableList.value = selection
}
// 重置搜索表单
const resetSearchForm = () => {
  resetForm(searchFormRef.value)
  loadOrganizationDept()
}
// 重置表单
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
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

  await deleteManyOrganizationDept(ids)
  loadOrganizationDept()

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
    parentId: 0,
    name: '',
    sort: 0,
    leader: '',
    phone: 0,
    email: '',
    status: true,
    orgId: 0
  }
  isShowFormDialog.value = false
}
// 添加 and 编辑 数据
const operation = (type: string, row?: DeptEntity) => {
  if (type === 'add' && !row?.id) {
    deptList.value = []
    deptList.value.push({
      id: 0,
      name: '顶级部门',
      children: []
    })
  }

  if (type === 'add' && row?.id) {
    form.value.parentId = row?.id
    form.value.orgId = row?.orgId
    getTreeselect(0)
  }
  if (type === 'edit' && row?.id) {
    loadOrganizationDeptById(row?.id)
    getTreeselect(row?.orgId)
  }
  if (type === 'edit' && !row?.id) {
    row = selectableList.value[0]
    loadOrganizationDeptById(row?.id)
    getTreeselect(row?.orgId)
  }
  isShowFormDialog.value = true
}
// 获取部门详情
const loadOrganizationDeptById = (id: number) => {
  getOrganizationDeptById(id).then((data) => {
    form.value = data
  })
}
// 更改状态
const handleStatusChange = async (row: DeptEntity) => {
  await patchOrganizationDept(row.id, { status: row.status })
  loadOrganizationDept()
}
// 提交修改数据
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      if (form.value.id) {
        await patchOrganizationDept(form.value.id, form.value)
      } else {
        await addOrganizationDept(form.value)
      }
      closeFormDialog()
      loadOrganizationDept()
    }
  })
}
// 初始化
onMounted(() => {
  loadOrganizationOrg()
})
</script>
<template>
  <div class="container">
    <el-row :gutter="12">
      <!--机构数据-->
      <el-col :span="4" :xs="24">
        <el-card class="box-card tree-card" shadow="never" style="height: calc(100vh - 104px)">
          <div class="head-container">
            <el-input
              v-model="queryOrg.name"
              placeholder="请输入机构名称"
              clearable
              prefix-icon="Search"
              style="margin-bottom: 20px"
            />
          </div>
          <div class="head-container">
            <el-tree
              ref="treeRef"
              :data="orgList"
              :props="treeProps"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              default-expand-all
              @node-click="handleNodeClick"
            />
          </div>
        </el-card>
      </el-col>
      <!--部门数据-->
      <el-col :span="20" :xs="24">
        <!-- 搜索 -->
        <el-card v-show="isShowSearchForm" class="box-card">
          <el-form ref="searchFormRef" :model="query" label-width="80px" status-icon>
            <el-row :gutter="20">
              <el-col :span="6">
                <el-form-item label="部门名称" prop="name"
                  ><el-input v-model="query.name" clearable @clear="loadOrganizationDept"
                /></el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="状态" prop="status">
                  <el-select
                    v-model="query.status"
                    clearable
                    placeholder="请选择状态"
                    @clear="loadOrganizationDept"
                  >
                    <el-option label="正常" :value="true" />
                    <el-option label="停用" :value="false" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-button icon="Search" type="primary" plain @click="loadOrganizationDept"
              >搜索</el-button
            >
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
              <el-button icon="Switch" type="info" plain @click="toggleExpandAll">{{
                isExpandAll ? '折叠' : '展开'
              }}</el-button>
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
                ><el-button icon="Refresh" circle @click="loadOrganizationDept"></el-button
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

          <el-table
            v-if="refreshTable"
            :data="tableData"
            style="width: 100%"
            row-key="id"
            :default-expand-all="isExpandAll"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
            @selection-change="selectable"
          >
            <el-table-column align="center" width="40" type="selection" />
            <!-- <el-table-column prop="id" label="编号" align="center" width="70" /> -->
            <el-table-column prop="name" label="部门名称" align="center" show-overflow-tooltip />
            <el-table-column prop="leader" label="负责人" align="center" show-overflow-tooltip />
            <el-table-column prop="email" label="邮箱" align="center" show-overflow-tooltip />
            <el-table-column prop="phone" label="联系电话" align="center" show-overflow-tooltip />
            <el-table-column prop="sort" label="排序" align="center" show-overflow-tooltip />
            <el-table-column prop="status" label="状态" align="center">
              <template #default="scope">
                <el-switch
                  v-model="scope.row.status"
                  :active-value="true"
                  :inactive-value="false"
                  @change="handleStatusChange(scope.row)"
                ></el-switch>
              </template>
            </el-table-column>
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
      </el-col>
    </el-row>

    <!-- 对话框 -->
    <el-dialog
      v-model="isShowFormDialog"
      :title="form.id ? '编辑' : '新增' + '部门'"
      width="600px"
      draggable
      @close="closeFormDialog"
    >
      <el-form ref="formRef" :model="form" :rules="formRules" label-width="80px" status-icon>
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属机构" prop="orgId">
              <el-tree-select
                v-model="form.orgId"
                :data="orgList"
                :props="treeProps"
                check-strictly
                default-expand-all
                width="120px"
                placeholder="请选择所属机构"
                @change="handleOrgChange"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上级部门" prop="parentId">
              <el-tree-select
                v-model="form.parentId"
                :data="deptList"
                :props="treeProps"
                check-strictly
                placeholder="请选择上级部门"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="部门名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入部门名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人" prop="leader">
              <el-input v-model="form.leader" placeholder="请输入负责人" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="form.phone" placeholder="请输入联系电话" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="显示顺序" prop="sort">
              <el-input-number v-model="form.sort" :min="0" controls-position="right" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="机构状态" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio :value="true">正常</el-radio>
                <el-radio :value="false">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
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
