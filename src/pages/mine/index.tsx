import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { AtAvatar, AtButton } from 'taro-ui'
import { FILE_HOST } from '@/consts/index'

const styles = require('./index.module.scss')

class Index extends Component {
  config: Config = {
    navigationBarTitleText: '我的'
  }

  componentWillMount() {}

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className={styles.contentWrap}>
        <View className={styles.header}>
          <AtAvatar
            className={styles.headerImg}
            size="large"
            image={''}
            circle={true}
          />
          <View className={styles.headerInfo}>
            <View className={styles.name}>黄志远</View>
            <View className={styles.role}>管理员</View>
          </View>
        </View>
        <View className={styles.listItem} style={{ marginTop: 24 }}>
          <Image className={styles.icon} src={`${FILE_HOST}me_ic_call.png`} />
          <Text className={styles.name}>我的电话</Text>
          <Text className={styles.right}>15919177724</Text>
        </View>
        <View className={styles.listItem}>
          <Image
            className={styles.icon}
            src={`${FILE_HOST}me_ic_mechanism.png`}
          />
          <Text className={styles.name}>所属机构</Text>
          <Text className={styles.right}>北京市/朝阳区</Text>
        </View>
        <View className={styles.listItem}>
          <Image
            className={styles.icon}
            src={`${FILE_HOST}me_ic_incumbency.png`}
          />
          <Text className={styles.name}>在职时间</Text>
          <Text className={styles.right}>2019.05.01-至今</Text>
        </View>

        <View
          className={styles.listItem}
          onClick={() => {}}
          style={{ marginTop: 24 }}
        >
          <Image className={styles.icon} src={`${FILE_HOST}me_ic_fllow.png`} />
          <Text className={styles.name}>关于我们</Text>
          <Image
            className={styles.arrow}
            src={`${FILE_HOST}common_ic_nnarrow.png`}
          />
        </View>
        <AtButton type="primary" className={styles.loginOut}>
          退出
        </AtButton>
      </View>
    )
  }
}

export default Index as ComponentType
