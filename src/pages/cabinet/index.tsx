import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

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

  componentWillMount() {}

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="container">
        <View className={styles.header}>
          <View className={styles.headerTitle}>我的机柜</View>
          <View className={styles.headerOrg}>
            <Text>机构：</Text>
            <Text className={styles.headerOrgBtn}>全部</Text>
          </View>
        </View>
        <View className={styles.content}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(i => {
            return (
              <View className={styles.listItem} key={i}>
                <Image mode="aspectFit" lazyLoad={true} className={styles.img} />
                <View className={styles.listContent}>
                  <View>
                    <View className={styles.listTitle}>朝阳公园消防柜A</View>
                    <View className={styles.listDesc}>AC132423</View>
                  </View>
                  <View className={styles.address}>北京朝阳区望京SOHO</View>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

export default Index as ComponentType
