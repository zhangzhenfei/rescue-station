import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import { AtButton } from 'taro-ui'

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
    return (
      <ScrollView className="container" scrollY={true}>
        <View className={styles.content}>
          <Image
            src={require('../../assets/img/common_ic_logo.png')}
            mode="widthFix"
            lazyLoad={true}
            className={styles.logo}
          />
          <AtButton type="primary">登录</AtButton>
        </View>
      </ScrollView>
    )
  }
}

export default Index as ComponentType
