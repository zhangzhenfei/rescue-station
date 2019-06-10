import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import { AtNavBar, AtGrid, AtMessage } from 'taro-ui'
import { FILE_HOST } from '@/consts'
import { apiGetCabinetDetail, apiSendMqtt, ICabinetDetail, IMqttCommand } from './api'
import Modal from './components/modal'
import { ModalType } from './components/modal/interface'
import { EMqttCommandType } from './interface'

const styles = require('./index.module.scss')

type PageStateProps = {
  counterStore: {
    counter: number
    increment: Function
    decrement: Function
    incrementAsync: Function
  }
}

interface Index {
  props: PageStateProps
}

interface IState {
  currentModal: {
    show: boolean
    type: ModalType
  }
  detail?: ICabinetDetail
}

const carbinetOpera = [
  {
    image: FILE_HOST + 'guizi_ic_in.png',
    value: '物资入库',
    url: '/pages/cabinet/pages/materials/index?type=in'
  },
  {
    image: FILE_HOST + 'guizi_ic_out.png',
    value: '物资出库',
    url: '/pages/cabinet/pages/materials/index?type=out'
  },
  {
    image: FILE_HOST + 'guizi_ic_replace.png',
    value: '物资更换',
    url: '/pages/cabinet/pages/materials/index?type=change'
  },
  {
    image: FILE_HOST + 'guizi_ic_video.png',
    value: 'LED大屏',
    url: ''
  },
  {
    image: FILE_HOST + 'guizi_ic_report.png',
    value: '维护上报',
    url: ''
  }
]

@inject('counterStore')
@observer
class Index extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '首页'
  }

  state: IState = {
    currentModal: {
      show: false,
      type: ModalType.LOCK
    },
    detail: undefined
  }

  componentWillMount() {
    this.loadDetail()
  }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  async loadDetail() {
    const { params: { id = undefined } = {} } = this.$router
    if (id) {
      const data = await apiGetCabinetDetail(id)
      if (data.head.ret === 0) {
        this.setState({
          detail: data.data
        })
      }
    }
  }
  increment = () => {
    const { counterStore } = this.props
    counterStore.increment()
  }

  decrement = () => {
    const { counterStore } = this.props
    counterStore.decrement()
  }

  incrementAsync = () => {
    const { counterStore } = this.props
    counterStore.incrementAsync()
  }
  navigateBack = () => {
    Taro.navigateBack()
  }

  showCtrl(type: ModalType) {
    this.setState({ currentModal: { show: true, type } })
  }

  handleCabinetClick(item) {
    Taro.navigateTo({ url: `${item.url}&fcid=${this.$router.params.id}` })
  }

  deviceStatus(detail: ICabinetDetail) {
    const s = detail.deviceStatusInfo || {}
    const bGood = (s && s.alarmHardStatus + s.controlHardStatus + s.lockHardStatus === 3) || false

    const isLedOn = s.ledStatus === 1
    const isWarnOn = s.alarmStatus === 1
    const isLockOn = s.lockStatus === 1
    return [
      {
        title: bGood ? '设备正常' : '设备异常',
        style: bGood ? styles.green : styles.red
      },
      {
        title: isLedOn ? '屏幕开机' : '屏幕休眠',
        style: isLedOn ? styles.green : styles.grey
      },
      {
        title: isWarnOn ? '警报开启' : '警报关闭',
        style: isWarnOn ? styles.red : styles.grey
      },
      {
        title: isLockOn ? '门锁开启' : '门锁关闭',
        style: isLockOn ? styles.red : styles.grey
      }
    ]
  }
  render() {
    const { currentModal, detail = {} as ICabinetDetail } = this.state
    const devStatus = this.deviceStatus(detail)
    return (
      <View className={[styles.container, 'container'].join(' ')}>
        <AtMessage />
        <AtNavBar
          color="#000"
          fixed={true}
          title={detail.name}
          leftIconType="chevron-left"
          onClickLeftIcon={this.navigateBack.bind(this)}
        />
        <View className={styles.header}>
          <View className={styles.title}>{detail.name}</View>
          <View className={styles.desc}>{detail.code}</View>
          <View className={styles.address}>{detail.address}</View>
          <View className={styles.states}>
            {devStatus.map(i => (
              <View className={[styles.state, i.style].join(' ')}>{i.title}</View>
            ))}
          </View>
        </View>
        <View className={styles.ctrl}>
          <View className={styles.wrap} onClick={this.showCtrl.bind(this, ModalType.WARN)}>
            <View className={styles.detail}>
              <Image
                src={FILE_HOST + 'guizi_ic_jingbao01.png'}
                mode="widthFix"
                lazyLoad={true}
                className={styles.icon}
              />
              <Text>警报控制</Text>
            </View>
          </View>
          <View className={styles.wrap} onClick={this.showCtrl.bind(this, ModalType.LOCK)}>
            <View className={styles.detail}>
              <Image src={FILE_HOST + 'guizi_ic_door01.png'} mode="widthFix" lazyLoad={true} className={styles.icon} />
              <Text>门锁控制</Text>
            </View>
          </View>
          <View className={styles.wrap} onClick={this.showCtrl.bind(this, ModalType.SCREEN)}>
            <View className={styles.detail}>
              <Image
                src={FILE_HOST + 'guizi_ic_videocontrol01.png'}
                mode="widthFix"
                lazyLoad={true}
                className={styles.icon}
              />
              <Text>屏幕控制</Text>
            </View>
          </View>
        </View>
        <View className={styles.operaWrap}>
          <View className={[styles.subTitle].join(' ')}>机柜操作</View>
          <AtGrid
            mode="square"
            columnNum={3}
            hasBorder={true}
            data={carbinetOpera}
            onClick={this.handleCabinetClick.bind(this)}
          />
        </View>
        <Modal show={currentModal.show} modalType={currentModal.type} onClick={this.onCommand} />
      </View>
    )
  }

  onCommand = async (type: ModalType, isOn) => {
    const { params: { id = undefined } = {} } = this.$router
    if (id) {
      let commandType
      if (type === ModalType.WARN) {
        commandType = isOn ? EMqttCommandType.openWarn : EMqttCommandType.closeWarn
      } else if (type === ModalType.SCREEN) {
        commandType = EMqttCommandType.led
      } else if (type === ModalType.LOCK) {
        commandType = EMqttCommandType.door
      }
      const param: IMqttCommand = {
        type: commandType,
        fcId: id,
        jsonStr: {
          status: isOn
        }
      }
      const data = await apiSendMqtt(param)
      const { head: { ret = -1, msg = '发送失败' } = {} } = data
      if (ret == 0) {
        Taro.atMessage({
          message: '成功',
          type: 'success'
        })
      } else {
        Taro.atMessage({
          message: msg,
          type: 'success'
        })
      }
    }
  }
}

export default Index as ComponentType
