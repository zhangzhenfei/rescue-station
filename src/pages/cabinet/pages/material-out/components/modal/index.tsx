import { View, Text, Image } from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { IModal, ModalType } from './interface'

const styles = require('./index.module.scss')

import { FILE_HOST } from '@/consts'

interface IState {
  _show: boolean
  animShow: boolean
}

class Modal extends Component<IModal> {
  constructor(props) {
    super(...arguments)
    this.state = {
      animShow: false,
      _show: props.show
    }
  }

  componentDidMount() {
    const { _show } = this.state
    if (_show) this.animShow()
  }

  // 设置默认属性
  static defaultProps: IModal = {
    show: false,
    mask: true,
    modalType: ModalType.WARN,
    onHide: () => {},
    onOpen: () => {},
    onClose: () => {}
  }

  state: IState = {
    animShow: false,
    _show: false
  }

  componentWillReceiveProps(nextProps) {
    const { show } = nextProps
    if (show !== this.state._show) {
      show ? this.animShow() : this.animHide()
    }
  }

  onMaskClick() {
    this.animHide()
  }

  onHide() {
    this.setState({ _show: false }, () => {
      this.props.onClose && this.props.onClose()
    })
  }

  animHide() {
    this.setState({
      animShow: false
    })
    setTimeout(() => {
      this.onHide()
    }, 300)
  }

  animShow() {
    this.setState({ _show: true })
    setTimeout(() => {
      this.setState({
        animShow: true
      })
    }, 200)
  }

  render() {
    const { mask, modalType } = this.props
    const { animShow, _show } = this.state

    const maskStyle = {
      display: mask ? 'block' : 'none',
      opacity: animShow ? 1 : 0
    }
    const listStyle = {
      opacity: animShow ? 1 : 0,
      transition: animShow ? 'all 225ms cubic-bezier(0, 0, 0.2, 1)' : 'all 195ms cubic-bezier(0.4, 0, 0.6, 1)'
    }

    const titleMap = {
      [ModalType.WARN]: {
        title: '警报控制',
        icon: FILE_HOST + 'guizi_ic_jingbao.png',
        desc: '用于控制该机柜警报开启和关闭，请谨慎操作！',
        btns: ['开启警报', '关闭警报']
      },
      [ModalType.LOCK]: {
        title: '门锁控制',
        icon: FILE_HOST + 'guizi_ic_door.png',
        desc: '用于门锁控制，一键将打开所有该机柜所有门！',
        btns: ['一键开锁']
      },
      [ModalType.SCREEN]: {
        title: '屏幕控制',
        icon: FILE_HOST + 'guizi_ic_videocontrol.png',
        desc: '用于控制该机柜警报开启和关闭，请谨慎操作！',
        btns: ['屏幕开机', '屏幕关机']
      }
    }

    return (
      _show && (
        <View>
          <View className="at-drawer__mask" style={maskStyle} onClick={this.onMaskClick.bind(this)} />
          <View className={styles.content} style={listStyle}>
            <View className={styles.title}>
              <Text>{titleMap[modalType].title}</Text>
              <View className={styles.close} onClick={this.onHide.bind(this)} />
            </View>
            <View className={styles.wrap}>
              <Image src={titleMap[modalType].icon} mode="widthFix" lazyLoad={true} className={styles.icon} />
              <Text>{titleMap[modalType].desc}</Text>
            </View>
            <View className={styles.btns}>
              {titleMap[modalType].btns.map((btn, index) => {
                return (
                  <View className={styles.btn} key={btn}>
                    <AtButton type={index === 0 ? 'primary' : 'secondary'}>{btn}</AtButton>
                  </View>
                )
              })}
            </View>
          </View>
        </View>
      )
    )
  }
}

export default Modal
