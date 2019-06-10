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
  selectPath: IAgency[]
}

class AreaSelect extends Component<IAreaSelect> {
  constructor(props) {
    super(...arguments)
    this.state = {
      animShow: false,
      _show: props.show,
      agencies: props.agencies,
      selectAgency: undefined,
      selectPath: [],
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
    selectPath: [],
    cols: []
  }
  // 临时辅助的栈
  stack: Array<Array<IAgency>> = []
  pathStack: IAgency[] = []

  async asyncSetState(state: any) {
    const self = this
    return new Promise(r => {
      self.setState(state, r)
    })
  }

  async componentWillReceiveProps(nextProps) {
    const { show, agencies } = nextProps
    if (show !== this.state._show) {
      show ? this.animShow() : this.animHide()
    }
    if (agencies !== this.state.agencies) {
      await this.asyncSetState({
        agencies: [...agencies]
      })
      this.reloadCols(this.state.agencies)
    }
  }

  /**
   * 根据this.state.selectAgency，计算：
   * 1. UI上应该显示多少列，及其每列的数据 存储到this.state.cols:Array<Array<IAgency>>
   * 2. 从根节点到被点击节点这条路径上所有节点 存储到 this.state.selectPath
   *
   * @params items 接口返回的机构列表 IAgency是一个递归结构
   */
  async reloadCols(items: IAgency[] = []) {
    this.stack = []
    this.pathStack = []
    const bFind = this.recursiveFind(items)
    if (!bFind && items.length > 0) {
      // 没有找到 则重置回显示第一列，即所有根节点，且无选中状态
      await this.asyncSetState({
        cols: [items],
        selectPath: []
      })
    } else if (bFind) {
      // selectPath记录了从根到点击的机构所构成的路径上的节点ID，用逗号分隔开
      // 用以显示的时候 高亮这条路径
      await this.asyncSetState({
        cols: this.stack,
        selectPath: this.pathStack
      })
      this.stack = []
      this.pathStack = []
    }
  }

  recursiveFind(items: IAgency[]) {
    this.stack.push(items)
    const curId = this.state.selectAgency && this.state.selectAgency.id
    let bFind = false
    for (const item of items) {
      this.pathStack.push(item)
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
      this.pathStack.pop()
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

  async onChooseAgency(agency, e = undefined) {
    if (e) {
      e.preventDefault()
    }
    await this.asyncSetState({
      selectAgency: agency
    })
    await this.reloadCols(this.state.agencies)
    const path = this.state.selectPath.map(val => val.name).join('/')
    this.props.onConfirm && this.props.onConfirm(this.state.selectAgency, path)
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
    this.onChooseAgency(undefined)
  }

  isActive(agency: IAgency) {
    const flag = this.state.selectPath.some(i => i.id === agency.id)
    return flag ? styles.active : ''
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
          <AtMessage />
          <View className="at-drawer__mask" style={maskStyle} onClick={this.onMaskClick.bind(this)} />
          <View className={styles.content} style={listStyle}>
            <View className={styles.wrap}>
              {this.state.cols.map(col => {
                return (
                  <View className={styles.list}>
                    {col.map(agency => {
                      return (
                        <View
                          key={agency.id}
                          className={[styles.item, this.isActive(agency)].join(' ')}
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
