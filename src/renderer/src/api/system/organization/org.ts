import request from '@/plugins/axios'
import { BaseListResult } from '@/types'

export interface QueryOrgDto {
  pageNum?: number
  pageSize?: number
  name?: string
  status?: boolean
}
export interface OrgEntity {
  id: number
  createTime: string | Date
  updateTime: string | Date
  parentId: number
  name: string
  sort: number
  leader: string
  phone: number
  email: string
  status: boolean
}

export interface CreateOrgDto {
  parentId?: number
  name: string
  sort?: number
  leader?: string
  phone?: number
  email?: string
  status?: boolean
}

export type UpdateOrgDto = Partial<CreateOrgDto>

/**
 * 新增机构
 * @param data CreateOrgDto
 * @returns Promise
 */
export const addOrganizationOrg = (data?: CreateOrgDto): Promise<OrgEntity> =>
  request.post('/api/admin/system/organization/org', data)

/**
 * 修改机构
 * @param data CreateOrgDto
 * @returns Promise
 */
export const patchOrganizationOrg = (id: number, data: UpdateOrgDto): Promise<OrgEntity> =>
  request.patch(`/api/admin/system/organization/org/${id}`, data)

/**
 * 批量删除机构
 * @param  ids number[]
 * @returns Promise
 */
export const deleteManyOrganizationOrg = (ids: number[]): Promise<{ count: number }> =>
  request.post(`/api/admin/system/organization/org/deleteMany`, { ids })

/**
 * 获取机构列表
 * @param params QueryOrgDto
 * @returns Promise
 */
export const getOrganizationOrg = (params?: QueryOrgDto): Promise<BaseListResult<OrgEntity[]>> =>
  request.get('/api/admin/system/organization/org', { params })
