import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import { AtNavBar } from 'taro-ui'
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

interface IState {
  showCalender: boolean
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

  state: IState = {
    showCalender: false
  }

  componentWillMount() {}

  navigateBack = () => {
    Taro.navigateBack()
  }

  handleSelectMaterial() {
    Taro.navigateTo({ url: '/pages/cabinet/pages/material-details/index' })
  }

  handleSelectBatch() {
    Taro.navigateTo({ url: '/pages/cabinet/pages/material-batchs/index' })
  }

  render() {
    return (
      <View className={[styles.container, 'container'].join(' ')}>
        <AtNavBar
          color="#000"
          title="更换"
          leftIconType="chevron-left"
          onClickLeftIcon={this.navigateBack.bind(this)}
        />

        <View className={styles.steps}>
          <View className={styles.step}>
            <Text className={[styles.num, styles.active].join(' ')}>1</Text>
            <Text>出库</Text>
          </View>
          <View className={styles.step}>
            <Text className={styles.num}>2</Text>
            <Text>入库</Text>
          </View>
        </View>

        <View className={styles.list}>
          <View className={styles.listItem} onClick={this.handleSelectMaterial.bind(this)}>
            <Text className={styles.name}>物资</Text>
            <Text className={styles.right}>15919177724</Text>
            <Image className={styles.arrow} src={`${FILE_HOST}common_ic_nnarrow.png`} />
          </View>
          <View className={styles.listItem}>
            <Text className={styles.name}>数量</Text>
            <Text className={styles.right}>13</Text>
            <Image className={styles.arrow} src={`${FILE_HOST}common_ic_nnarrow.png`} />
          </View>
        </View>

        <View className={styles.list}>
          <View className={styles.listItem} onClick={this.handleSelectBatch.bind(this)}>
            <Text className={styles.name}>批次</Text>

            <Image className={styles.arrow} src={`${FILE_HOST}common_ic_nnarrow.png`} />
          </View>
        </View>
      </View>
    )
  }
}

export default Index as ComponentType
