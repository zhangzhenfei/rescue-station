import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'

const styles = require('./index.module.scss')

type PageStateProps = {}

interface Index {
  props: PageStateProps
}

class Index extends Component {
  config: Config = {
    navigationBarTitleText: '欢迎页'
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
    return <View className={styles.content}>欢迎页面</View>
  }
}

export default Index as ComponentType
