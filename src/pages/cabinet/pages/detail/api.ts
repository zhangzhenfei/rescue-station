import request from '@/utils/request'
export * from './interface'
import { IMqttCommand } from './interface'

export const apiGetCabinetDetail = async id => {
  const data = await request.get('/api/lt/rescue/v1/fc/getdetails', { id })
  return data
}

/**
 * 发送MQTT指令
 * @param params 发送的参数
 */
export const apiSendMqtt = async (params: IMqttCommand) => {
  const newParams: any = { ...params }
  if (newParams.jsonStr) {
    newParams.jsonStr = JSON.stringify(newParams.jsonStr)
  }
  const data = await request.post('/api/lt/rescue/v1/mqtt/sendinstruction', newParams)
  return data
}
