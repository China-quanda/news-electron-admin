import request from '@/plugins/axios'
import { BaseListResult } from '@/types'

export interface QueryNoticeDto {
  pageNum?: number
  pageSize?: number
  title?: string
  type?: number
  status?: boolean | null
}
export interface NoticeEntity {
  id: number
  createTime: string | Date
  updateTime: string | Date
  title: string
  type: number
  status: boolean
  content: string
}

export interface CreateNoticeDto {
  title: string
  type: number
  status?: boolean
  content: string
}

export type UpdateNoticeDto = Partial<CreateNoticeDto>

/**
 * 新增通知公告
 * @param data CreateSystemDmNoticeDto
 * @returns Promise
 */
export const addDmNotice = (data?: CreateNoticeDto): Promise<NoticeEntity> =>
  request.post('/api/admin/system/message/notice', data)

/**
 * 修改通知公告
 * @param data CreateSystemDmNoticeDto
 * @returns Promise
 */
export const patchDmNotice = (id: number, data: UpdateNoticeDto): Promise<NoticeEntity> =>
  request.patch(`/api/admin/system/message/notice/${id}`, data)

/**
 * 批量删除通知公告
 * @param  ids number[]
 * @returns Promise
 */
export const deleteManyDmNotice = (ids: number[]): Promise<{ count: number }> =>
  request.post(`/api/admin/system/message/notice/deleteMany`, { ids })

/**
 * 获取通知公告列表
 * @param params QueryNoticeDto
 * @returns Promise
 */
export const getDmNotice = (params?: QueryNoticeDto): Promise<BaseListResult<NoticeEntity[]>> =>
  request.get('/api/admin/system/message/notice', { params })
