import request from '@/utils/request'

/**
 * 新增或编辑
 * @returns Promise
 */
export const saveOrUpdate = async params => {
  const data = await request.post('/api/lt/rescue/v1/ms/saveorupdate', params)
  return data
}
