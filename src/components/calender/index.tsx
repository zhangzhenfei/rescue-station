import { View } from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'
import { AtCalendar, AtButton } from 'taro-ui'
import { ICalender } from './interface'

const styles = require('./index.module.scss')

interface IState {
  _show: boolean
  animShow: boolean
}

class Calender extends Component<ICalender> {
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
  static defaultProps: ICalender = {
    show: false,
    mask: true,
    onClose: () => {},
    onSelect: () => {}
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
      transform: animShow ? '' : 'translateY(100%)',
      transition: animShow ? 'all 225ms cubic-bezier(0, 0, 0.2, 1)' : 'all 195ms cubic-bezier(0.4, 0, 0.6, 1)'
    }

    return (
      _show && (
        <View className={styles.content}>
          <View className={styles.mask} style={maskStyle} onClick={this.onMaskClick.bind(this)} />
          <View className={styles.wrap} style={listStyle}>
            <AtCalendar isVertical />
            <View className={styles.btns}>
              <View className={styles.btn}>
                <AtButton circle={false}>取消</AtButton>
              </View>
              <View className={styles.btn}>
                <AtButton type="primary" circle={false}>
                  确定
                </AtButton>
              </View>
            </View>
          </View>
        </View>
      )
    )
  }
}

export default Calender
