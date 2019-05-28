import request from '@/utils/request'
/**
 * 微信用户数据解密
 * @param {string} account 账号
 * @param {String} password 密码
 * @returns Promise
 */
export const login = async (account, password) => {
  const params = {
    account,
    password,
    devicesystem: 'ANDROID' //ANDROID  IOS
    // validatorcode: password
  }
  const data = await request.post('/api/user/account/v1/login/register', params)
  return data
}
