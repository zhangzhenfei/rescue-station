import request from '@/utils/request'
import { log } from '@/utils/common'
import OSS from 'ali-oss'

let client = null
let objectName = ''

export const getOSSOptionFromServer = async () => {
  const { head, data } = await request.get('/api/log/event/v1/storage/getosstoken')
  if (head.ret === 0) {
    const options = {
      accessKeyId: data.accessKeyId,
      accessKeySecret: data.accessKeySecret,
      bucket: data.paramMap.OSS.bucket,
      endpoint: data.paramMap.OSS.endPoint,
      stsToken: data.securityToken,
      objectName: data.paramMap.OSS.objectName
    }
    return options
  }
  return {}
}

export const initClient = async () => {
  const options = await getOSSOptionFromServer()
  log('初始化阿里云OSS客户端')
  objectName = options.objectName
  return new OSS(options)
}

export const uploadFile = async file => {
  if (!client) {
    client = await initClient()
  }
  const currentDate = new Date().getTime()
  var splits = file.type.split('/')
  const name = `${objectName}${currentDate}.${splits[splits.length - 1]}`
  try {
    const blob = await request.getBlob(file.path)
    const { url } = await client.put(name, blob)
    return url
  } catch (error) {
    client = null
    return await uploadFile(file)
  }
}
