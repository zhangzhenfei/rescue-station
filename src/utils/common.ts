import Taro from '@tarojs/taro';

/**
 *
 * @param args 向控制台打印日志
 */
export const log = (...args) => {
  console.log.apply(console, args);
};

/**
 * 获取系统信息
 */
export const systemInfo = (() => {
  return Taro.getSystemInfoSync();
})();

/**
 * 是否iphonex
 */
export const isIpx = () => systemInfo.model.indexOf('iPhone X') !== -1;
