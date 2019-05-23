import Taro from '@tarojs/taro';
import { log } from './common';

const USER_INFO = 'USER_INFO'; // 用户个人信息
const WX_USERINFO = 'WX_USERINFO';
const TOKEN_ID = 'TOKEN_ID'; // TOKEN令牌ID

/**
 * 保存用户信息到本地存储中
 * @param {Object} user 用户信息
 */
export const saveUserInfo = async user => {
  log('保存用户信息', user);
  const result = await Taro.setStorage({
    key: USER_INFO,
    data: user
  });
  return result;
};

/**
 * 从本地存储中获取微信用户信息
 */
export const getWxUserInfo = () => {
  return Taro.getStorageSync(WX_USERINFO) || {};
};

/**
 * 从本地存储中获取用户ID
 */
export const getUserid = () => {
  const user = Taro.getStorageSync(USER_INFO) || {};
  return user.userid;
};

/**
 * 保存令牌ID到本地存储中
 * @param {String} tokenid 令牌
 */
export const saveTokenid = tokenid => {
  Taro.setStorage({
    key: TOKEN_ID,
    data: tokenid
  });
};

/**
 * 从本地存储中获取令牌ID
 */
export const getTokenid = () => {
  return Taro.getStorageSync(TOKEN_ID) || '';
};
