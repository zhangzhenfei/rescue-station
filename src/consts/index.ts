export const API_HOST = 'http://rescue.sadais.com'
export const FILE_HOST = 'http://m.sadais.com/rescue/img/app_h5/'

// header头信息
const USER_AGENT = 'sadais-agent'
const VERSION = '1.0'
const CHANNEL = 'RESCUE'
const APPNAME = 'RESCUE_H5'
const SYSTEAM = 'H5'
const NETWORK = ''
const OPERATOR = ''

export const getUserAgent = () => {
  // 应用英文名称（全大写）/当前版本/系统（全大写）/渠道信息/系统信息/网络信息/运营商(小程序取不到运营商，此项为空)，
  return `${APPNAME}/${VERSION}/${SYSTEAM}/${CHANNEL}/${SYSTEAM}/${NETWORK}/`
}

export default {
  API_HOST,
  FILE_HOST,
  USERAGENT: getUserAgent()
}
