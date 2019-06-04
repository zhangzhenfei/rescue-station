import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import { AtButton, AtMessage, AtNavBar } from 'taro-ui'

import { findPageList } from './assets/api'
import { IResourceType } from './assets/interface'
import { IListResult } from '@/interfaces/index'
import { log } from '@/utils/common'

const styles = require('./index.module.scss')

class Index extends Component {
  config: Config = {
    navigationBarTitleText: '物资种类管理'
  }

  public state = {
    pageNo: 1,
    hasPre: true,
    result: [] as IResourceType[]
  }

  componentWillMount() {
    log('加载数据')
    this.loadData()
  }

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  async loadData() {
    const responseRes = await findPageList(this.state.pageNo)
    if (responseRes.head.ret === 0) {
      const data: IListResult<IResourceType> = responseRes.data
      const { result, prePage, hasPre } = data
      this.setState({ result, pageNo: prePage, hasPre })
    }
  }

  navigateBack = () => {
    Taro.navigateBack()
  }

  render() {
    const { result } = this.state
    return (
      <View className={[styles.container, 'container'].join(' ')}>
        <View>
          <AtNavBar
            color="#000"
            title="物资种类"
            leftIconType="chevron-left"
            onClickLeftIcon={this.navigateBack.bind(this)}
          />
        </View>
        <View className={styles.wrap}>
          {!result || result.length === 0 ? (
            <View className={styles.emptyText}>暂无添加物资类型</View>
          ) : (
            <ScrollView
              className={[styles.container, 'scroll-container'].join(' ')}
              scrollY={true}
            >
              {result.map((item, index) => {
                return (
                  <View className={styles.listItem} key={index}>
                    <View className={styles.title}>{item.name}</View>
                    <View className={styles.remark}>{item.remark}</View>
                  </View>
                )
              })}
            </ScrollView>
          )}
        </View>
      </View>
    )
  }
}

export default Index as ComponentType
