import request from '@/plugins/axios'

/**
 * 查询服务器信息
 * @returns Promise
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMonitorServer = (): Promise<any> => request.get('/api/admin/system/monitor/server')
