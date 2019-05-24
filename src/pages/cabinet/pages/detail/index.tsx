import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import { AtNavBar, AtGrid } from 'taro-ui'
import { FILE_HOST } from '@/consts'

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

  render() {
    return (
      <View className={[styles.container, 'container'].join(' ')}>
        <AtNavBar color="#000" fixed={true} leftIconType="chevron-left" />
        <View className={styles.header}>
          <View className={styles.title}>朝阳公园消防柜A</View>
          <View className={styles.desc}>AC132423</View>
          <View className={styles.address}>北京朝阳区望京SOHO</View>
          <View className={styles.states}>
            <View className={styles.state}>设备正常</View>
            <View className={[styles.state, styles.red].join(' ')}>屏幕开机</View>
            <View className={[styles.state, styles.grey].join(' ')}>警报关闭</View>
            <View className={styles.state}>门锁开启</View>
          </View>
        </View>
        <View className={styles.ctrl}>
          <View className={styles.wrap}>
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
          <View className={styles.wrap}>
            <View className={styles.detail}>
              <Image src={FILE_HOST + 'guizi_ic_door01.png'} mode="widthFix" lazyLoad={true} className={styles.icon} />
              <Text>门锁控制</Text>
            </View>
          </View>
          <View className={styles.wrap}>
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
            data={[
              {
                image: FILE_HOST + 'guizi_ic_in.png',
                value: '物资入库'
              },
              {
                image: FILE_HOST + 'guizi_ic_out.png',
                value: '物资出库'
              },
              {
                image: FILE_HOST + 'guizi_ic_replace.png',
                value: '物资更换'
              },
              {
                image: FILE_HOST + 'guizi_ic_video.png',
                value: 'LED大屏'
              },
              {
                image: FILE_HOST + 'guizi_ic_report.png',
                value: '维护上报'
              }
            ]}
          />
        </View>
      </View>
    )
  }
}

export default Index as ComponentType
