import request from '@/plugins/axios'
/**
 * 获取最新版本号
 * @param params object
 * @returns object
 */
export const getVersion = (params: object) => request.get('/api/admin/system/getVersion', params)
