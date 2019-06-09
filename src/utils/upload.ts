import Taro from '@tarojs/taro'
import request from '@/utils/request'
import {log} from '@/utils/common'
import OSS from 'ali-oss';

const OSS_OPTIONS_KEY = 'OSS_OPTIONS_KEY';

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

export const initClient = async () {
  let options = Taro.getStorageSync(OSS_OPTIONS_KEY);
  if (!options) {
    options = await getOSSOptionFromServer();
    Taro.setStorageSync(OSS_OPTIONS_KEY, options);
  }

  if (options) {
    log('初始化阿里云OSS客户端')
    objectName = options.objectName;
    client = new OSS(options);
  }
}

export const uploadFile = () => {

  if(!client) {
    initClient()
  }

}
