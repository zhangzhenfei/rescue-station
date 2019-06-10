import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { log, navigateTo, navigateBack } from '@/utils/common'

import { findPageList } from './assets/api'
import { IMaterials } from './assets/interface'
import { IListResult } from '@/interfaces/index'

import { AtNavBar, AtButton } from 'taro-ui'

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

  navigateBack = () => {
    navigateBack()
  }

  handleToggleStatus() {
    this.setState({ isEdit: !this.state.isEdit })
  }

  handleNewOrEdit(item) {
    this.props.indexStore.setEditMaterial(item || {})
    this.setState({ isEdit: false })
    navigateTo('/pages/index/pages/materials-edit/index', { isEdit: item ? 1 : 0 })
  }

  render() {
    const { isEdit, materials } = this.state
    return (
      <View className={[styles.container, 'container'].join(' ')}>
        <View className={styles.nav}>
          <AtNavBar
            color="#000"
            title="请选择种类"
            leftIconType="chevron-left"
            onClickLeftIcon={this.navigateBack.bind(this)}
          />
          <View
            className={[styles.tool, isEdit ? styles.finish : ''].join(' ')}
            onClick={this.handleToggleStatus.bind(this)}
          >
            {isEdit ? '完成' : '管理'}
          </View>
        </View>
        <View className={styles.wrap}>
          <ScrollView className="scroll-container" scrollY={true}>
            {materials.map(material => {
              return (
                <View className={styles.listItem} key={material.id}>
                  <View className={styles.mainContent}>
                    <Image mode="scaleToFill" src={material.img} lazyLoad={true} className={styles.img} />
                    <View className={styles.listContent}>
                      <View>
                        <View className={styles.listTitle}>{material.name}</View>
                        <View className={styles.listDesc}>{material.model}</View>
                      </View>
                      <View className={styles.address}>{material.createDate}</View>
                    </View>
                  </View>
                  {isEdit && (
                    <View className={styles.itemTool}>
                      <View className={styles.btnWrap}>
                        <AtButton type="primary" size="small" onClick={this.handleNewOrEdit.bind(this, material)}>
                          编辑
                        </AtButton>
                      </View>
                      <View className={styles.btnWrap}>
                        <AtButton type="secondary" size="small">
                          删除
                        </AtButton>
                      </View>
                    </View>
                  )}
                </View>
              )
            })}
          </ScrollView>
          {!isEdit && (
            <AtButton type="primary" className={styles.btn} onClick={this.handleNewOrEdit.bind(this, false)}>
              新增物资种类
            </AtButton>
          )}
        </View>
      </View>
    )
  }
}

export default Index as ComponentType
