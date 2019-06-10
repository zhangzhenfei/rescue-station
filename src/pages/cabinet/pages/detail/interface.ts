export interface ICabinetDetail {
  id: string
  mId: string // 机构ID
  mechaName: string // 机构名称
  name: string // 消防柜名称
  deviceName: string
  address: string
  img: string
  installDate: string // YYYY-MM-DD
  code: string // 消防柜编码
  controlId: string // 主控板ID
  videoUrl: string
  deviceInfos: IDeviceInfo[] // 构成消防柜的子设备信息 i.e LED、智能锁
  deviceStatusInfo: IDeviceStatus // 设备状态(硬件状态与开启状态)
}

// 代表消防柜上的LED、智能锁、报警器这些组成器件的信息
export interface IDeviceInfo {
  id: string // 记录ID
  fcId: string // 消防柜ID
  deviceName: string // 设备名称
  type: number // 设备类型
  model: string // 设备型号
  produceDate: string // 设备出厂日期 yyyy-MM-dd
  manufactor: string // 设备厂家
  remark?: string // 设备描述
}

export interface IDeviceStatus {
  controlHardStatus: number // 主控板硬件状态 0异常 1正常
  alarmHardStatus: number // 警报器硬件状态 0异常 1正常
  lockHardStatus: number // 智能锁硬件状态 0异常 1正常

  alarmStatus: number // 警报器开启状态 0关闭 1开启
  lockStatus: number // 智能锁开启状态 0关闭 1开启
  ledStatus: number // LED屏幕开启状态 0关闭 1开启
}

export enum EMqttCommandType {
  door = 1,
  openWarn,
  closeWarn,
  video,
  led
}
export interface IMqttJSonParam {
  videoUrl?: string
  status?: number // 1-开 0-关
}
export interface IMqttCommand {
  fcId: string
  type: EMqttCommandType
  jsonStr: IMqttJSonParam
}
