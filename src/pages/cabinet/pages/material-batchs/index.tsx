import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import { AtNavBar } from 'taro-ui'

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

  componentWillMount() {}

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  navigateBack = () => {
    Taro.navigateBack()
  }

  handleBtnClick() {
    const url = `/pages/cabinet/pages/material-${this.state.type}/index`
    Taro.navigateTo({ url })
  }

  render() {
    return (
      <View className={[styles.container, 'container'].join(' ')}>
        <View>
          <AtNavBar
            color="#000"
            title="请选择批次"
            leftIconType="chevron-left"
            onClickLeftIcon={this.navigateBack.bind(this)}
          />
        </View>
        <View className={styles.wrap}>
          <ScrollView className={[styles.container, 'scroll-container'].join(' ')} scrollY={true}>
            <View className={styles.content}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(i => {
                return (
                  <View className={styles.listItem} key={i}>
                    <Image mode="aspectFit" lazyLoad={true} className={styles.img} />
                    <View className={styles.listContent}>
                      <View>
                        <View className={styles.listTitle}>消防战斗服</View>
                        <View className={styles.listDesc}>NA-02</View>
                      </View>
                      <View className={styles.address}>剩余12个</View>
                    </View>
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default Index as ComponentType
