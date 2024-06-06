import request from '@/plugins/axios'
import { BaseListResult } from '@/types'

export interface QuerymobileDeviceDto {
  pageNum?: number
  pageSize?: number
  username?: string
  deviceNo?: string
  depId?: number | null
  status?: boolean | null
}
export interface mobileDeviceEntity {
  id: number
  createTime: string | Date
  updateTime: string | Date
  deviceOs: string
  deviceNo: string
  deviceBrand: string
  status: boolean
  userId: number
}

export interface CreatemobileDeviceDto {
  deviceOs: string
  deviceNo: string
  deviceBrand: string
  userId: number
  status?: boolean
}

export type UpdatemobileDeviceDto = Partial<CreatemobileDeviceDto>

// /**
//  * 新增用户设备
//  * @param data CreateSystemPermissionMobileDeviceDto
//  * @returns Promise
//  */
// export const addPermissionMobileDevice = (data?: CreatemobileDeviceDto): Promise<mobileDeviceEntity> =>
//   request.post('/api/admin/system/permission/mobileDevice', data)

/**
 * 修改用户设备
 * @param data CreateSystemPermissionMobileDeviceDto
 * @returns Promise
 */
export const patchPermissionMobileDevice = (
  id: number,
  data: UpdatemobileDeviceDto
): Promise<mobileDeviceEntity> =>
  request.patch(`/api/admin/system/permission/mobileDevice/${id}`, data)

/**
 * 批量删除用户设备
 * @param  ids number[]
 * @returns Promise
 */
export const deleteManyPermissionMobileDevice = (ids: number[]): Promise<{ count: number }> =>
  request.post(`/api/admin/system/permission/mobileDevice/deleteMany`, { ids })

/**
 * 获取用户设备列表
 * @param params QuerymobileDeviceDto
 * @returns Promise
 */
export const getPermissionMobileDevice = (
  params?: QuerymobileDeviceDto
): Promise<BaseListResult<mobileDeviceEntity[]>> =>
  request.get('/api/admin/system/permission/mobileDevice', { params })
