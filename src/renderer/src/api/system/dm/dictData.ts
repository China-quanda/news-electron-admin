import request from '@/plugins/axios'
import { BaseListResult } from '@renderer/types'
import { useCache, CACHE_KEY } from '@/composables/useCache'
const { wsCache } = useCache()

export interface DictDataQuery {
  dictType: string
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

export type DictDataTypes = DictDataItem[keyof DictDataItem]

// interface ObjectWithArrayProps {
//   [key: string]: DictDataItem[]
// }
// 和上面效果一致
export type ObjectWithArrayProps = Record<string, DictDataItem[]>
// 想要效果 Promise<{'system_notice_type': DictDataItem[],'system_notice': DictDataItem[]}>

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

/**
 * 获取数据字典数据 - 根据字典类型批量获取
 * @param dictTypes string[]
 * @returns Promise
 * @example getSystemDictDatas(["system_notice_type","system_status"])
 */
export const getSystemDictDatas = (dictTypes: string[]): Promise<ObjectWithArrayProps> => {
  return new Promise((resolve, reject) => {
    if (!dictTypes.length) {
      return reject('请传入字典数据列表 example: ["system_notice_type", "system_status"]')
    }
    let promiseAll = []
    dictTypes.forEach(async (dictType) => {
      const dictDataCache: ObjectWithArrayProps = wsCache.get(CACHE_KEY.SYSTEM.DM.DICT_DATA) || {}
      if (dictDataCache[dictType] === undefined) {
        promiseAll.push(
          getDmDictData({ dictType }).then((res) => {
            wsCache.set(CACHE_KEY.SYSTEM.DM.DICT_DATA, {
              ...(wsCache.get(CACHE_KEY.SYSTEM.DM.DICT_DATA) || {}),
              [dictType]: res.list
            })
          }) as never
        )
      }
    })

    Promise.all(promiseAll).finally(() => {
      promiseAll = []
      const dictDatas: ObjectWithArrayProps = {}
      const dictDataCache: ObjectWithArrayProps = wsCache.get(CACHE_KEY.SYSTEM.DM.DICT_DATA) || {}
      dictTypes.forEach((dictType) => {
        if (dictDataCache[dictType]) dictDatas[dictType] = dictDataCache[dictType]
      })
      resolve(dictDatas)
    })
  })
}

/**
 * 数据字典转换过滤
 * @param dictValue 字典键值 value DictDataTypes
 * @param dictList 字典数据 list DictDataItem[]
 * @param attribute 字典属性 的某个属性 默认为 label
 * @returns DictDataTypes
 */
export const turnSystemDict = (
  dictValue: DictDataTypes,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dictList: DictDataItem[],
  attribute: string = 'label'
): DictDataTypes => {
  const dict = dictList.find((dict) => dict.value == dictValue)
  if (dict) {
    return dict[attribute]
  } else {
    return ''
  }
}
