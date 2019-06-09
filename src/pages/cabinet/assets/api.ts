import request from '@/utils/request'
export * from './interface'

/**
 * 获取我的消防柜列表
 */
export const apiGetMyCabinetList = async () => {
  const data = request.get('/api/lt/rescue/v1/fc/getmyfirecabinet')
  return data
}

/**
 * 获取机构列表 树状结构
 */
export const apiGetAgencyList = async () => {
  const data = request.get('/api/lt/rescue/v1/me/gettree')
  return data
}

/**
 * 根据选择的机构ID，获取这个机构下的所有机柜和人员列表
 */
export const apiGetDataOnAgency = async (agencyId: string) => {
  const data = request.get('/api/lt/rescue/v1/me/findlistbytree', { treeid: agencyId })
  return data
}
