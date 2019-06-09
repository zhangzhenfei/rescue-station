import request from '@/utils/request'

/**
 * 查询列表数据
 * @param {number} pageNo 账号
 * @returns Promise
 */
export const findPageList = async pageNo => {
  const params = {
    pageNo,
    pageSize: 20
  }
  const data = await request.post('/api/lt/rescue/v1/ms/findpagelist', params)
  return data
}
