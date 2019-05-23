import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import { AtGrid } from 'taro-ui'
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
        <View className={styles.header}>
          <View className={styles.title}>智能应急综合救援站</View>
        </View>

        <View className={styles.infoWrap}>
          <View className={styles.info}>
            <View className={styles.subTitle}>紧急消息</View>
            <AtGrid
              mode="square"
              columnNum={3}
              hasBorder={false}
              data={[
                {
                  image: FILE_HOST + 'home_ic_siren.png',
                  value: '机柜警报'
                },
                {
                  image: FILE_HOST + 'home_ic_rescuecall.png',
                  value: '救援电话'
                },
                {
                  image: FILE_HOST + 'home_ic_todolist.png',
                  value: '督办事项'
                }
              ]}
            />
          </View>
        </View>

        <View className={styles.operaWrap}>
          <View className={[styles.subTitle, styles.opera].join(' ')}>救援管理</View>
          <AtGrid
            mode="square"
            columnNum={3}
            hasBorder={true}
            data={[
              {
                image: FILE_HOST + 'home_ic_materialtype.png',
                value: '物资类型管理'
              },
              {
                image: FILE_HOST + 'home_ic_materiamanage.png',
                value: '物资管理'
              },
              {
                image: FILE_HOST + 'home_ic_cabinet.png',
                value: '机柜管理'
              },
              {
                image: FILE_HOST + 'home_ic_mechanism.png',
                value: '机构管理'
              },
              {
                image: FILE_HOST + 'home_ic_privilege.png',
                value: '权限管理'
              },
              {
                image: FILE_HOST + 'home_ic_volunteer.png',
                value: '志愿者管理'
              }
            ]}
          />
        </View>
      </View>
    )
  }
}

export default Index as ComponentType
