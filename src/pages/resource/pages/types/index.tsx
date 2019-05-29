import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtMessage } from 'taro-ui'
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
    pageNo: 1
  }

  componentWillMount() {}

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  public async loadData() {
    const result = await findPageList(this.state.pageNo)
    if (result.head.ret === 0) {
      const data: IListResult<IResourceType> = result.data
      log(data)
    }
  }

  render() {
    return <View className="container" />
  }
}

export default Index as ComponentType
