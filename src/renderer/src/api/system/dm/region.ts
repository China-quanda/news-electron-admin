import request from '@/plugins/axios'
import { BaseListResult } from '@/types'

export interface QueryRegionDto {
  pageNum?: number
  pageSize?: number
}
export interface RegionEntity {
  id: number
  createTime: string | Date
  updateTime: string | Date
  parentCode: number
  code: number
  name: string
  sort: number
}

export interface CreateRegionDto {
  code: number
  parentCode?: number
  name: string
  sort?: number
}

export type UpdateRegionDto = Partial<CreateRegionDto>

/**
 * 新增行政区域
 * @param data CreateSystemDmRegionDto
 * @returns Promise
 */
export const addDmRegion = (data?: CreateRegionDto): Promise<RegionEntity> =>
  request.post('/api/admin/system/dm/region', data)

/**
 * 修改行政区域
 * @param data CreateSystemDmRegionDto
 * @returns Promise
 */
export const patchDmRegion = (id: number, data: UpdateRegionDto): Promise<RegionEntity> =>
  request.patch(`/api/admin/system/dm/region/${id}`, data)

/**
 * 批量删除行政区域
 * @param  ids number[]
 * @returns Promise
 */
export const deleteManyDmRegion = (ids: number[]): Promise<{ count: number }> =>
  request.post(`/api/admin/system/dm/region/deleteMany`, { ids })

/**
 * 获取行政区域列表
 * @param params QueryRegionDto
 * @returns Promise
 */
export const getDmRegion = (params?: QueryRegionDto): Promise<BaseListResult<RegionEntity[]>> =>
  request.get('/api/admin/system/dm/region', { params })
