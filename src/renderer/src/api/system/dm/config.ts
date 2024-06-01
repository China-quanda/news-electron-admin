import request from '@/plugins/axios'
import { BaseListResult } from '@renderer/types'

export interface QueryConfigDto {
  pageNum?: number
  pageSize?: number
  name?: string
  key?: string
  value?: string
  startTime?: string
  endTime?: string
  type?: boolean
}
export interface ConfigEntity {
  id: number
  createTime: string
  updateTime: string
  name: string
  key: string
  value: string
  type: boolean
  remark: string
}

export interface CreateConfigDto {
  name: string
  key: string
  value: string
  type?: boolean
  remark?: string
}

/**
 * 新增字典数据
 * @param data CreateConfigDto
 * @returns Promise
 */
export const addDmConfig = (data?: CreateConfigDto): Promise<ConfigEntity> =>
  request.post('/api/admin/system/dm/config', data)

/**
 * 修改字典数据
 * @param data CreateConfigDto
 * @returns Promise
 */
export const patchDmConfig = (id: number, data?: CreateConfigDto): Promise<ConfigEntity> =>
  request.patch(`/api/admin/system/dm/config/${id}`, data)

/**
 * 批量删除字典数据
 * @param  ids number[]
 * @returns Promise
 */
export const deleteManyDmConfig = (ids: number[]): Promise<{ count: number }> =>
  request.post(`/api/admin/system/dm/config/deleteMany`, { ids })

/**
 * 获取字典数据列表
 * @param params QueryConfigDto
 * @returns Promise
 */
export const getDmConfig = (params?: QueryConfigDto): Promise<BaseListResult<ConfigEntity[]>> =>
  request.get('/api/admin/system/dm/config', { params })
