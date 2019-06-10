import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { log, navigateBack } from '@/utils/common'

import { findPageList } from './api'
import { IMaterials } from './interface'
import { IListResult } from '@/interfaces/index'

import { AtNavBar } from 'taro-ui'

const styles = require('./index.module.scss')

interface IState {
  isEdit: boolean
  pageNo: number
  hasPre: boolean
  materials: IMaterials[]
}

type PageStateProps = {
  indexStore: {
    editMaterial: any
    setEditMaterial: Function
  }
}

interface Index {
  props: PageStateProps
}

@inject('indexStore')
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
    navigationBarTitleText: '请选择种类'
  }

  public state: IState = {
    isEdit: false,
    pageNo: 1,
    hasPre: true,
    materials: []
  }

  componentWillReact() {
    console.log('componentWillReact')
  }

  componentWillMount() {
    log('加载数据')
    this.loadData()
  }

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {
    console.log(this)
  }

  componentDidHide() {}

  async loadData() {
    const responseRes = await findPageList(this.state.pageNo)
    if (responseRes.head.ret === 0) {
      const data: IListResult<IMaterials> = responseRes.data
      const { result, prePage, hasPre } = data
      this.setState({ materials: result, pageNo: prePage, hasPre })
    }
  }

  handleToggleStatus() {
    this.setState({ isEdit: !this.state.isEdit })
  }

  handleSelectClass(material) {
    this.props.indexStore.setEditMaterial({
      ...this.props.indexStore.editMaterial,
      mtId: material.id,
      typeName: material.name
    })
    navigateBack()
  }

  render() {
    const {
      indexStore: { editMaterial }
    } = this.props
    const { materials } = this.state
    return (
      <View className={[styles.container, 'container'].join(' ')}>
        <AtNavBar
          color="#000"
          title="请选择种类"
          leftIconType="chevron-left"
          onClickLeftIcon={navigateBack.bind(this)}
        />
        <View className={styles.wrap}>
          <ScrollView className="scroll-container" scrollY={true}>
            {materials.map(material => {
              return (
                <View
                  className={styles.listItem}
                  key={material.id}
                  onClick={this.handleSelectClass.bind(this, material)}
                >
                  <View className={styles.mainContent}>
                    <View
                      className={[styles.listContent, editMaterial.mtId === material.id ? styles.selected : ''].join(
                        ' '
                      )}
                    >
                      <View className={styles.listTitle}>{material.name}</View>
                      <View className={styles.listDesc}>{material.remark}</View>
                    </View>
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default Index as ComponentType
