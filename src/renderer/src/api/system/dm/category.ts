import request from '@/plugins/axios'
import { BaseListResult } from '@/types'

export interface QueryCategoryDto {
  pageNum?: number
  pageSize?: number
  name?: string
  code?: string
  status?: boolean
}
export interface CategoryEntity {
  id: number
  createTime: string | Date
  updateTime: string | Date
  parentId: number
  name: string
  code: string
  level: number
  sort: number
  status: boolean
  remark: string
}

export interface CreateCategoryDto {
  parentId?: number
  name: string
  code?: string
  level?: number
  sort?: number
  status?: boolean
  remark?: string
}

export type UpdateCategoryDto = Partial<CreateCategoryDto>

/**
 * 新增数据分类
 * @param data CreateSystemDmCategoryDto
 * @returns Promise
 */
export const addDmCategory = (data?: CreateCategoryDto): Promise<CategoryEntity> =>
  request.post('/api/admin/system/dm/category', data)

/**
 * 修改数据分类
 * @param data CreateSystemDmCategoryDto
 * @returns Promise
 */
export const patchDmCategory = (id: number, data: UpdateCategoryDto): Promise<CategoryEntity> =>
  request.patch(`/api/admin/system/dm/category/${id}`, data)

/**
 * 批量删除数据分类
 * @param  ids number[]
 * @returns Promise
 */
export const deleteManyDmCategory = (ids: number[]): Promise<{ count: number }> =>
  request.post(`/api/admin/system/dm/category/deleteMany`, { ids })

/**
 * 获取数据分类列表
 * @param params QueryCategoryDto
 * @returns Promise
 */
export const getDmCategory = (
  params?: QueryCategoryDto
): Promise<BaseListResult<CategoryEntity[]>> =>
  request.get('/api/admin/system/dm/category', { params })
