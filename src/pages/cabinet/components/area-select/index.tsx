import { View } from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { IAreaSelect } from './interface'

const styles = require('./index.module.scss')

import { systemInfo } from '@/utils/common'

interface IState {
  _show: boolean
  animShow: boolean
}

class AreaSelect extends Component<IAreaSelect> {
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
  static defaultProps: IAreaSelect = {
    show: false,
    mask: true,
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
    const { mask } = this.props
    const { animShow, _show } = this.state

    const maskStyle = {
      display: mask ? 'block' : 'none',
      opacity: animShow ? 1 : 0
    }
    const listStyle = {
      opacity: animShow ? 1 : 0,
      transform: animShow ? '' : 'translateY(-100%)',
      transition: animShow ? 'all 225ms cubic-bezier(0, 0, 0.2, 1)' : 'all 195ms cubic-bezier(0.4, 0, 0.6, 1)'
    }

    console.log(systemInfo)

    return (
      _show && (
        <View>
          <View className="at-drawer__mask" style={maskStyle} onClick={this.onMaskClick.bind(this)} />
          <View className={styles.content} style={listStyle}>
            <View className={styles.wrap}>
              <View className={styles.list}>
                <View className={[styles.item, styles.active].join(' ')}>北京</View>
                <View className={styles.item}>天津</View>
              </View>
              <View className={styles.list}>
                <View className={styles.item}>全部</View>
                <View className={[styles.item, styles.active].join(' ')}>朝阳区</View>
                <View className={styles.item}>丰台区</View>
                <View className={styles.item}>海定区</View>
              </View>
              <View className={styles.list}>
                <View className={[styles.item, styles.active].join(' ')}>南屏</View>
                <View className={styles.item}>丸子</View>
                <View className={styles.item}>极大</View>
              </View>
            </View>
            <View className={styles.btns}>
              <View className={styles.btn}>
                <AtButton>重制</AtButton>
              </View>
              <View className={styles.btn}>
                <AtButton type="primary">确定</AtButton>
              </View>
            </View>
          </View>
        </View>
      )
    )
  }
}

export default AreaSelect
