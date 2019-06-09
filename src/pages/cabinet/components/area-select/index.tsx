import { View } from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'
import { AtButton, AtMessage } from 'taro-ui'
import { IAreaSelect, IAgency } from './interface'
import { log } from '@/utils/common'
const styles = require('./index.module.scss')

import { systemInfo } from '@/utils/common'

interface IState {
  _show: boolean
  animShow: boolean
  agencies: IAgency[]
  selectAgency?: IAgency
  cols: Array<Array<IAgency>>
}

class AreaSelect extends Component<IAreaSelect> {
  constructor(props) {
    super(...arguments)
    this.state = {
      animShow: false,
      _show: props.show,
      agencies: props.agencies,
      selectAgency: (props.agencies && props.agencies.length > 0 && props.agencies[0]) || undefined,
      cols: []
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
    onClose: () => {},
    agencies: []
  }

  state: IState = {
    animShow: false,
    _show: false,
    agencies: [],
    selectAgency: undefined,
    cols: []
  }
  // 临时辅助的栈
  stack: Array<Array<IAgency>> = []

  componentWillReceiveProps(nextProps) {
    const { show, agencies } = nextProps
    if (show !== this.state._show) {
      show ? this.animShow() : this.animHide()
    }
    if (agencies !== this.state.agencies) {
      const self = this
      this.setState(
        {
          agencies: [...agencies]
        },
        () => {
          setTimeout(() => {
            self.reloadCols(self.state.agencies)
          }, 0)
        }
      )
    }
  }

  reloadCols(items: IAgency[] = []) {
    // 下面setTimeout的原因是为了fix setState无效的问题
    const self = this
    this.stack = []
    const bFind = this.recursiveFind(items)

    if (!bFind && items.length > 0) {
      // 如果没有找到 则说明selectId不对 默认选中第一个机构
      this.setState(
        {
          selectAgency: items[0]
        },
        () => {
          setTimeout(() => {
            self.reloadCols(items)
          }, 0)
        }
      )
    } else {
      setTimeout(() => {
        self.setState(
          {
            cols: self.stack
          },
          () => {
            self.stack = []
          }
        )
      }, 0)
    }
  }

  recursiveFind(items: IAgency[]) {
    this.stack.push(items)
    const curId = this.state.selectAgency && this.state.selectAgency.id
    let bFind = false
    for (const item of items) {
      if (item.id === curId) {
        // 如果在当前这一层找到选中的机构 则把当前机构的下级列表 也入栈保存
        bFind = true
        if (item.mechanismTree.length > 0) {
          this.stack.push(item.mechanismTree)
        }
        break
      }
      if (item.mechanismTree.length > 0) {
        // 递归查找当前节点的下一层
        bFind = this.recursiveFind(item.mechanismTree)
        if (bFind) {
          break
        }
      }
    }
    if (!bFind) {
      this.stack.pop()
    }
    return bFind
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

  onChooseAgency(agency, e = undefined) {
    if (e) {
      e.preventDefault()
    }
    const self = this
    this.setState(
      {
        selectAgency: agency
      },
      () => {
        setTimeout(() => {
          self.reloadCols(self.state.agencies)
        }, 0)
        if (self.state.selectAgency) {
          self.props.onConfirm && self.props.onConfirm(self.state.selectAgency)
        }
      }
    )
  }

  onConfirm(e) {
    e.preventDefault()
    if (!this.state.selectAgency) {
      Taro.atMessage({
        message: '请选择机构',
        type: 'warning'
      })
      return
    }
    this.onMaskClick()
  }

  onReset(e) {
    e.preventDefault()

    this.setState((prev: IState) => {
      const selectAgency = (prev.agencies && prev.agencies.length > 0 && prev.agencies[0]) || undefined
      if (selectAgency) {
        this.onChooseAgency(selectAgency)
      }
      return {
        selectAgency
      }
    })
  }
  render() {
    const { mask } = this.props
    const { animShow, _show, selectAgency } = this.state

    const agencyId = selectAgency && selectAgency.id
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
          <AtMessage />
          <View className="at-drawer__mask" style={maskStyle} onClick={this.onMaskClick.bind(this)} />
          <View className={styles.content} style={listStyle}>
            <View className={styles.wrap}>
              {this.state.cols.map(col => {
                return (
                  <View className={styles.list}>
                    {col.map(agency => {
                      const isActive = agency.id === agencyId ? styles.active : ''
                      return (
                        <View
                          key={agency.id}
                          className={[styles.item, isActive].join(' ')}
                          onClick={this.onChooseAgency.bind(this, agency)}
                        >
                          {agency.name}
                        </View>
                      )
                    })}
                  </View>
                )
              })}
            </View>
            <View className={styles.btns}>
              <View className={styles.btn}>
                <AtButton onClick={this.onReset.bind(this)}>重置</AtButton>
              </View>
              <View className={styles.btn}>
                <AtButton type="primary" onClick={this.onConfirm.bind(this)}>
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

export default AreaSelect
