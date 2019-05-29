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
  const data = await request.post('/api/lt/rescue/v1/mt/findpagelist', params)
  return data
}

/**
 * 新增或编辑
 * @param {string} id
 * @param {string} name
 * @param {string} remark
 * @returns Promise
 */
export const saveOrUpdate = async (id, name, remark) => {
  const params = {
    id,
    name,
    remark
  }
  const data = await request.post('/api/lt/rescue/v1/mt/saveorupdate', params)
  return data
}

/**
 * 删除记录
 * @param {string} id 账号
 * @returns Promise
 */
export const deleteRecord = async id => {
  const params = {
    id
  }
  const data = await request.post('/api/lt/rescue/v1/mt/del', params)
  return data
}
