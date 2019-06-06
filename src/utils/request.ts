import Taro from '@tarojs/taro'
import CONSTS from '@/consts'
import { log } from './common'
import { IResponseResult } from '@/interfaces/index'

Taro.addInterceptor(Taro.interceptors.logInterceptor)
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor)

const request = async (url, data, method) => {
  // log('请求地址为：', url)
  // log('请求参数为：', data)

  const result = await Taro.request({
    url,
    data,
    header: {
      'sadais-agent': CONSTS.USERAGENT,
      'content-type': 'application/json'
    },
    method
  })
  if (result.statusCode === 200) {
    return result.data as IResponseResult
  } else {
    return { data: {}, head: { ret: -999 } } as IResponseResult
  }
}

export default {
  get(url, data = {}) {
    const baseUrl = CONSTS.API_HOST
    const targetUrl = url.indexOf('http') === -1 ? baseUrl + url : url
    // log('发起GET请求')
    return request(targetUrl, data, 'POST')
  },
  post(url, data = {}) {
    const baseUrl = CONSTS.API_HOST
    const targetUrl = url.indexOf('http') === -1 ? baseUrl + url : url
    // log('发起POST请求')
    return request(targetUrl, data, 'POST')
  }
}
