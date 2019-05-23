import Taro from '@tarojs/taro';
import CONSTS from '../consts';
import { log } from './common';

Taro.addInterceptor(Taro.interceptors.logInterceptor);
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor);

const request = (url, data, method) => {
  log('请求地址为：', url);
  log('请求参数为：', data);
  return Taro.request({
    url,
    data,
    header: {
      'content-type': 'application/json'
    },
    method
  });
};

export default {
  get(url, data) {
    const baseUrl = CONSTS.HOST;
    const targetUrl = url.indexOf('http') === -1 ? baseUrl + url : url;
    log('发起GET请求');
    return request(targetUrl, data, 'POST');
  },
  post(url, data) {
    const baseUrl = CONSTS.HOST;
    const targetUrl = url.indexOf('http') === -1 ? baseUrl + url : url;
    log('发起POST请求');
    return request(targetUrl, data, 'POST');
  }
};
