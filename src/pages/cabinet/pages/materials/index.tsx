import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import { AtNavBar } from 'taro-ui'

import Materials from '../../components/materials/index'
import { OperaType } from '../../components/materials/interface'

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
  type: String
}

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
    navigationBarTitleText: '物资管理'
  }

  state: IState = {
    type: 'in'
  }

  componentWillMount() {
    this.setState({
      type: this.$router.params.type
    })
  }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

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

  render() {
    const { type } = this.state
    const typeTitleMap = {
      in: '物资入库',
      out: '物资出库',
      change: '物资更换'
    }
    return (
      <View className={[styles.container, 'container'].join(' ')}>
        <View>
          <AtNavBar
            color="#000"
            title={typeTitleMap[type]}
            leftIconType="chevron-left"
            onClickLeftIcon={this.navigateBack.bind(this)}
          />
        </View>
        <View className={styles.wrap}>
          <Materials type={OperaType.IN} />
        </View>
      </View>
    )
  }
}

export default Index as ComponentType
