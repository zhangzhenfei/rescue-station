import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { apiGetWuziList, IWuzi } from './api'
import { AtNavBar, AtButton } from 'taro-ui'

const styles = require('./index.module.scss')

const typeTitleMap = {
  in: '物资入库',
  out: '物资出库',
  change: '物资更换'
}

const typeBtnMap = {
  in: '入库',
  out: '出库',
  change: '更换'
}

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
  type: String
  list: IWuzi[]
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
    navigationBarTitleText: '物资管理'
  }

  state: IState = {
    type: 'in',
    list: []
  }

  componentWillMount() {
    this.setState({
      type: this.$router.params.type
    })
    this.loadWuziList()
  }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  navigateBack = () => {
    Taro.navigateBack()
  }

  handleBtnClick() {
    const url = `/pages/cabinet/pages/material-${this.state.type}/index`
    Taro.navigateTo({ url })
  }

  async loadWuziList() {
    const data = await apiGetWuziList(this.$router.params.fcid)
    if (data.head.ret === 0) {
      this.setState({
        list: data.data
      })
    }
  }

  getCount(item: IWuzi) {
    let count = 0
    let { materialBatchs = [] } = item
    count = materialBatchs.reduce((sum, i) => {
      sum += i.count
      return sum
    }, 0)
    return `剩余${count}个`
  }

  render() {
    const { type } = this.state

    const title = typeTitleMap[type]
    const btn = typeBtnMap[type]

    return (
      <View className={[styles.container, 'container'].join(' ')}>
        <View>
          <AtNavBar
            color="#000"
            title={title}
            leftIconType="chevron-left"
            onClickLeftIcon={this.navigateBack.bind(this)}
          />
        </View>
        <View className={styles.wrap}>
          <ScrollView className={[styles.container, 'scroll-container'].join(' ')} scrollY={true}>
            <View className={styles.content}>
              {this.state.list.map(i => {
                return (
                  <View className={styles.listItem} key={i.id}>
                    <Image mode="aspectFit" lazyLoad={true} className={styles.img} src={i.img} />
                    <View className={styles.listContent}>
                      <View>
                        <View className={styles.listTitle}>{i.name}</View>
                        <View className={styles.listDesc}>{i.remark}</View>
                      </View>
                      <View className={styles.address}>{this.getCount(i)}</View>
                      <AtButton className={styles.btn} type="secondary" onClick={this.handleBtnClick.bind(this)}>
                        {btn}
                      </AtButton>
                    </View>
                  </View>
                )
              })}
            </View>
          </ScrollView>
          <AtButton className={styles.btn} type="secondary" onClick={this.handleBtnClick.bind(this)}>
            {btn}
          </AtButton>
        </View>
      </View>
    )
  }
}

export default Index as ComponentType
