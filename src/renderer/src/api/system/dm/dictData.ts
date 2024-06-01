import request from '@/plugins/axios'
import { BaseListResult } from '@renderer/types'

export interface DictDataQuery {
  dictId: number
  pageNum?: number
  pageSize?: number
  label?: string
  status?: boolean
}
export interface DictDataItem {
  id: number
  createTime: string
  updateTime: string
  label: string
  value: string
  class: string
  sort: number
  remark: string
  status: boolean
  colorType: string
  dictId: number
}

export interface CreateDmDictDataDto {
  label: string
  value: string
  class: string
  sort: number
  colorType: string
  dictId: number
  status: boolean
  remark: string
}

/**
 * 新增字典数据
 * @param data CreateSystemDmDictDataDto
 * @returns Promise
 */
export const addDmDictData = (data?: CreateDmDictDataDto): Promise<DictDataItem> =>
  request.post('/api/admin/system/dm/dictData', data)

/**
 * 修改字典数据
 * @param data CreateSystemDmDictDataDto
 * @returns Promise
 */
export const patchDmDictData = (id: number, data?: CreateDmDictDataDto): Promise<DictDataItem> =>
  request.patch(`/api/admin/system/dm/dictData/${id}`, data)

/**
 * 批量删除字典数据
 * @param  ids number[]
 * @returns Promise
 */
export const deleteManyDmDictData = (ids: number[]): Promise<{ count: number }> =>
  request.post(`/api/admin/system/dm/dictData/deleteMany`, { ids })

/**
 * 获取字典数据列表
 * @param params DictDataQuery
 * @returns Promise
 */
export const getDmDictData = (params?: DictDataQuery): Promise<BaseListResult<DictDataItem[]>> =>
  request.get('/api/admin/system/dm/dictData', { params })
