import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtNavBar } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import { apiGetAgencyList, apiGetDataOnAgency, IAgency, ICabinet } from './assets/api'
import { navigateBack } from '@/utils/common'

const styles = require('./index.module.scss')

interface IState {
  showAreaSelect: false
  agencies: IAgency[]
  cabinets: ICabinet[]
  path: string
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
    navigationBarTitleText: '机柜管理'
  }

  state: IState = {
    showAreaSelect: false,
    agencies: [],
    cabinets: [],
    path: ''
  }

  componentWillMount() {
    this.loadAgencies()
  }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  async loadAgencies() {
    const data = await apiGetAgencyList()
    if (data.head.ret === 0) {
      this.setState({
        agencies: data.data
      })
    }
  }

  handleClickOrgBtn() {
    this.setState({ showAreaSelect: true })
  }

  navigateToDetail(cabinetId) {
    Taro.navigateTo({ url: `/pages/cabinet/pages/detail/index?id=${cabinetId}` })
  }

  async selectAgency(agency?: IAgency, path: string = '') {
    if (agency) {
      const data = await apiGetDataOnAgency(agency.id)
      if (data.head.ret === 0) {
        const { fcList = [] } = data.data
        this.setState({
          cabinets: fcList,
          path
        })
      }
    } else {
      this.setState({
        cabinets: [],
        path: ''
      })
    }
  }

  render() {
    const { path } = this.state
    const agencyName = path || '请选择'
    return (
      <View className="container">
        <AtNavBar color="#000" title="机柜管理" leftIconType="chevron-left" onClickLeftIcon={navigateBack.bind(this)} />
        <View className={styles.content}>
          {this.state.cabinets.map(i => {
            return (
              <View className={styles.listItem} key={i.id} onClick={this.navigateToDetail.bind(this, i.id)}>
                <Image mode="aspectFill" lazyLoad={true} className={styles.img} src={i.img} />
                <View className={styles.listContent}>
                  <View>
                    <View className={styles.listTitle}>{i.name}</View>
                    <View className={styles.listDesc}>{i.code}</View>
                  </View>
                  <View className={styles.address}>{i.address}</View>
                </View>
              </View>
            )
          })}
        </View>
      </View>
    )
  }
}

export default Index as ComponentType
