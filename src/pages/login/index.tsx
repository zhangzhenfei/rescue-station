import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'

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
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="container">
        <View className={styles.contentWrap}>
          <View className={styles.content}>
            <Image
              src={require('../../assets/img/common_ic_logo.png')}
              mode="widthFix"
              lazyLoad={true}
              className={styles.logo}
            />
            <div className={styles.title}>智能应急综合救援站</div>
            <AtForm className={styles.form}>
              <AtInput name="account" type="text" placeholder="请输入账号" onChange={()=>{}} />
              <AtInput name="password" type="password" placeholder="请输入密码" onChange={()=>{}} />
              <AtButton type="primary" formType="submit" className={styles.submit}>
                登录
              </AtButton>
            </AtForm>
          </View>
        </View>
      </View>
    )
  }
}

export default Index as ComponentType
