import request from '@/plugins/axios'
import { BaseListResult } from '@/types'

export interface QueryDeptDto {
  pageNum?: number
  pageSize?: number
  name?: string
  status?: boolean
  orgId?: number
}
export interface DeptEntity {
  id: number
  createTime: string | Date
  updateTime: string | Date
  parentId: number | null
  name: string
  sort: number
  leader: string
  phone: number
  email: string
  status: boolean
  orgId: number
}

export interface CreateDeptDto {
  parentId?: number | null
  name: string
  sort?: number
  leader?: string
  phone?: number
  email?: string
  status?: boolean
}

export type UpdateDeptDto = Partial<CreateDeptDto>

/**
 * 新增部门
 * @param data CreateDeptDto
 * @returns Promise
 */
export const addOrganizationDept = (data?: CreateDeptDto): Promise<DeptEntity> =>
  request.post('/api/admin/system/organization/dept', data)

/**
 * 修改部门
 * @param data CreateDeptDto
 * @returns Promise
 */
export const patchOrganizationDept = (id: number, data: UpdateDeptDto): Promise<DeptEntity> =>
  request.patch(`/api/admin/system/organization/dept/${id}`, data)

/**
 * 批量删除部门
 * @param  ids number[]
 * @returns Promise
 */
export const deleteManyOrganizationDept = (ids: number[]): Promise<{ count: number }> =>
  request.post(`/api/admin/system/organization/dept/deleteMany`, { ids })

/**
 * 获取部门列表
 * @param params QueryDeptDto
 * @returns Promise
 */
export const getOrganizationDept = (params?: QueryDeptDto): Promise<BaseListResult<DeptEntity[]>> =>
  request.get('/api/admin/system/organization/dept', { params })

/**
 * 获取部门详情
 * @param id number
 * @returns Promise
 */
export const getOrganizationDeptById = (id: number): Promise<DeptEntity> =>
  request.get(`/api/admin/system/organization/dept/${id}`)
