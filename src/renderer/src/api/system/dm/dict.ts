import request from '@/plugins/axios'
import { BaseListResult } from '@renderer/types'

export interface IDictListQuery {
  pageNum?: number
  pageSize?: number
  name?: string
  status?: boolean
  type?: string
}
export interface IDictListItem {
  id: number
  name: string
  type: string
  status: boolean
  remark: string
  createTime: string
  updateTime: string
}

export interface CreateSystemDmDictDto {
  name: string
  type: string
  status: boolean
  remark: string
}

/**
 * 新增数据字典
 * @param data CreateSystemDmDictDto
 * @returns Promise
 */
export const addDmDict = (data?: CreateSystemDmDictDto): Promise<IDictListItem> =>
  request.post('/api/admin/system/dm/dict', data)

/**
 * 修改数据字典
 * @param data CreateSystemDmDictDto
 * @returns Promise
 */
export const patchDmDict = (id: number, data?: CreateSystemDmDictDto): Promise<IDictListItem> =>
  request.patch(`/api/admin/system/dm/dict/${id}`, data)

/**
 * 批量删除数据字典
 * @param  ids number[]
 * @returns Promise
 */
export const deleteManyDmDict = (ids: number[]): Promise<{ count: number }> =>
  request.post(`/api/admin/system/dm/dict/deleteMany`, { ids })

/**
 * 获取数据字典列表
 * @param params IDictListQuery
 * @returns Promise
 */
export const getDmDict = (params?: IDictListQuery): Promise<BaseListResult<IDictListItem[]>> =>
  request.get('/api/admin/system/dm/dict', { params })
