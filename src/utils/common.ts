import Taro from '@tarojs/taro'

let isPageNavigating = false

/**
 * 将对象解析成url字符串
 * @param  {Object} obj 参数对象
 * @param  {Boolean} unEncodeURI 不使用编码
 * @return {String} 转换之后的url参数
 */
export const param = (obj = {}, unEncodeURI = false) => {
  let result: string[] = []

  for (let name of Object.keys(obj)) {
    let value = obj[name]

    result.push(name + '=' + (unEncodeURI ? value : encodeURIComponent(value)))
  }

  if (result.length) {
    return '?' + result.join('&')
  } else {
    return ''
  }
}

/**
 * 将url字符串解析成对象
 * @param  {String} str 带url参数的地址
 * @param  {Boolean} unDecodeURI 不使用解码
 * @return {Object} 转换之后的url参数
 */
export const unparam = (str = '', unDecodeURI) => {
  let result = {}
  let query = str.split('?')[1]

  if (!query) return result

  let arr = query.split('&')

  arr.forEach((item, idx) => {
    let param = item.split('=')
    let name = param[0]
    let value = param[1] || ''

    if (name) {
      result[name] = unDecodeURI ? value : decodeURIComponent(value)
    }
  })

  return result
}

/**
 * 保留当前页面，跳转到应用内的某个页面
 * @param {String} url 页面路径
 * @param {Object} params 页面参数
 */
export const navigateTo = (url, params = {}) => {
  _openInterceptor('navigateTo', url, params)
}

/**
 * 关闭当前页面，跳转到应用内的某个页面
 * @param {String} url 页面路径
 * @param {Object} params 页面参数
 */
export const redirectTo = (url, params) => {
  _openInterceptor('redirectTo', url, params)
}

/**
 * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
 * @param {String} url 页面路径
 * @param {Object} params 页面参数
 */
export const switchTab = (url, params) => {
  _openInterceptor('switchTab', url, params)
}

/**
 * 关闭所有页面，打开到应用内的某个页面
 * @param {String} url 页面路径
 * @param {Object} params 页面参数
 */
export const reLaunch = (url, params) => {
  _openInterceptor('reLaunch', url, params)
}

/**
 * 关闭所有页面，打开到应用内的某个页面
 * @param {String} url 页面路径
 * @param {Object} params 页面参数
 */
export const navigateBack = Taro.navigateBack

/**
 * 页面跳转封装
 * @param {String} method 微信JS方法
 * @param {String} url 页面路径
 * @param {Object} params 页面参数
 */
const _openInterceptor = (method, url, params) => {
  if (isPageNavigating) return
  isPageNavigating = true

  params = param(params)

  log('使用导航：', method, url, params)

  return Taro[method]({ url: url + params }).then(() => {
    isPageNavigating = false
  })
}

/**
 *
 * @param args 向控制台打印日志
 */
export const log = (...args) => {
  console.log.apply(console, args)
}

/**
 * 获取系统信息
 */
export const systemInfo = (() => {
  return Taro.getSystemInfoSync()
})()

/**
 * 是否iphonex
 */
export const isIpx = () => systemInfo.model.indexOf('iPhone X') !== -1
