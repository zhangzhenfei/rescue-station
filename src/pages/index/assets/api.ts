import request from '@/utils/request'

export * from './interface'

export const apiGetMsgColumns = async () => {
  const data = await request.get('/api/lt/rescue/v1/msg/getmsgcolumn')
  return data
}