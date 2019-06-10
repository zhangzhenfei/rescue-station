import request from '@/utils/request'
export * from './interface'

/**
 * 获取指定柜子下的物资列表
 * @param fcid 机柜id
 */
export const apiGetWuziList = async fcid => {
  const data = await request.get('/api/lt/rescue/v1/ms/getmaterialstorelist', {
    fcid
  })
  return data
}
