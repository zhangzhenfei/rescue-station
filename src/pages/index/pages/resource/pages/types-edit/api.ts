import request from '@/utils/request'

/**
 * 新增或编辑
 * @param {string} id
 * @param {string} name
 * @param {string} remark
 * @returns Promise
 */
export const saveOrUpdate = async params => {
  const data = await request.post('/api/lt/rescue/v1/mt/saveorupdate', params)
  return data
}
