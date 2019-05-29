import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtForm, AtInput, AtButton, AtMessage } from 'taro-ui'
import { login } from './assets/api'
import { log } from '@/utils/common'

const styles = require('./index.module.scss')

class Index extends Component {
  config: Config = {
    navigationBarTitleText: '欢迎页'
  }

  public state = {
    account: '',
    password: ''
  }

  componentWillMount() {}

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleInputChange(type, val) {
    this.setState({
      [type]: val
    })
  }

  validateForm() {
    const { account, password } = this.state
    if (!account) {
      Taro.atMessage({
        message: '请输入账号',
        type: 'warning'
      })
      return false
    }

    if (!password) {
      Taro.atMessage({
        message: '请输入密码',
        type: 'warning'
      })
      return false
    }
    return true
  }

  public async login() {
    if (this.validateForm()) {
      const { account, password } = this.state
      const result = await login(account, password)
      if (result.head.ret === 0) {
        Taro.switchTab({ url: '/pages/index/index' })
      }
    }
  }

  render() {
    const { account, password } = this.state
    return (
      <View className="container">
        <AtMessage />
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
              <AtInput
                className={styles.input}
                name="account"
                value={account}
                onChange={this.handleInputChange.bind(this, 'account')}
                placeholder="请输入账号"
              />
              <AtInput
                className={styles.input}
                name="password"
                value={password}
                type="password"
                onChange={this.handleInputChange.bind(this, 'password')}
                placeholder="请输入密码"
              />
              <AtButton
                type="primary"
                formType="submit"
                onClick={this.login.bind(this)}
                className={styles.submit}
              >
                登录
              </AtButton>
              {/* disabled={!account || !password} */}
            </AtForm>
          </View>
        </View>
      </View>
    )
  }
}

export default Index as ComponentType
