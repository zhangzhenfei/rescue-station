import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtGrid } from 'taro-ui'
import { FILE_HOST } from '@/consts'
import { navigateTo } from '@/utils/common'
import { apiGetMsgColumns, IIndexState } from './assets/api'

const styles = require('./index.module.scss')

class Index extends Component {
  config: Config = {
    navigationBarTitleText: '首页'
  }
  state: IIndexState = {
    msgColumns: []
  }
  componentWillMount() {
    this.loadMsgColumns()
  }

  componentWillReact() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  async loadMsgColumns() {
    const data = await apiGetMsgColumns()
    if (data.head.ret === 0) {
      this.setState({
        msgColumns: data.data
      })
    }
  }
  handleGridItemClick(item, index, event) {
    switch (index) {
      case 0:
        navigateTo('/pages/index/pages/types/index')
        break
      case 1:
        navigateTo('/pages/index/pages/materials/index')
        break
      default:
        break
    }
  }

  renderMsgColumns() {
    const data = this.state.msgColumns.map(val => ({
      image: val.pic,
      value: val.name
    }))
    const dom = (
      <div className={styles.msgCols}>
        {this.state.msgColumns.map(val => {
          return (
            <div className={styles.col}>
              <div className={styles.wrapper}>
                <div className={styles.imgDiv}>
                  <img src={val.pic} />
                  <span className={styles.redDot}>{val.count}</span>
                </div>
                <span>{val.name}</span>
              </div>
            </div>
          )
        })}
        {/* <AtGrid mode="square" columnNum={3} hasBorder={false} data={data} /> */}
      </div>
    )
    return dom
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
            {this.renderMsgColumns()}
          </View>
        </View>

        <View className={styles.operaWrap}>
          <View className={[styles.subTitle, styles.opera].join(' ')}>救援管理</View>
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
