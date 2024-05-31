import dayjs from 'dayjs'
/**
 * 格式化时间
 * @param date 时间 new Date()
 * @param format ‘YYYY-MM-DD’
 * @returns
 */
export const formatTime = (date: Date, format: string) => {
  return dayjs(date).format(format)
}
