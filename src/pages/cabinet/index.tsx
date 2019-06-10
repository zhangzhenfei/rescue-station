import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { apiGetAgencyList, apiGetDataOnAgency, IAgency, ICabinet } from './assets/api'
import AreaSelect from './components/area-select/index'

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
    navigationBarTitleText: '首页'
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
    const { showAreaSelect, path } = this.state
    const agencyName = path || '请选择'
    return (
      <View className="container">
        <View className={styles.header}>
          <View className={styles.headerTitle}>我的机柜</View>
          <View className={styles.headerOrg}>
            <Text>机构：</Text>
            <Text className={styles.headerOrgBtn} onClick={this.handleClickOrgBtn.bind(this)}>
              {agencyName}
            </Text>
          </View>
        </View>
        <AreaSelect show={showAreaSelect} agencies={this.state.agencies} onConfirm={this.selectAgency.bind(this)} />
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
