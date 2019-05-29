import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtGrid } from 'taro-ui'
import { FILE_HOST } from '@/consts'

const styles = require('./index.module.scss')

class Index extends Component {
  config: Config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount() {}

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  handleGridItemClick(item, index, event) {
    switch (index) {
      case 0:
        Taro.navigateTo({ url: '/pages/resource-manage/pages/types/index' })
        break
      default:
        break
    }
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
          <View className={[styles.subTitle, styles.opera].join(' ')}>
            救援管理
          </View>
          <AtGrid
            mode="square"
            columnNum={3}
            onClick={this.handleGridItemClick.bind(this)}
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
