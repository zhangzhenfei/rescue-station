import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Text } from '@tarojs/components'
import { AtButton, AtMessage, AtNavBar } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'

import { findPageList } from './assets/api'
import { IResourceType } from './assets/interface'
import { IListResult } from '@/interfaces/index'
import { log, navigateTo, navigateBack } from '@/utils/common'

const styles = require('./index.module.scss')

type PageStateProps = {
  indexStore: {
    editResourceType: any
    setEditResourceType: Function
  }
}

interface Index {
  props: PageStateProps
}

interface IState {
  isEdit: boolean
  pageNo: number
  hasPre: boolean
  result: IResourceType[]
}

@inject('indexStore')
@observer
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '物资种类管理'
  }

  public state: IState = {
    isEdit: false,
    pageNo: 1,
    hasPre: true,
    result: []
  }

  constructor(props) {
    super(...arguments)
    this.componentDidShow.bind(this)
  }

  componentWillMount() {
    log('加载数据')
    this.loadData()
  }

  componentWillReact() {
    log('componentWillReact', this)
  }

  componentDidMount() {
    log('componentDidMount', this)
  }

  componentWillUnmount() {
    log('componentWillUnmount', this)
  }

  componentDidShow() {
    log('componentDidShow', this)
  }

  componentDidHide() {
    log('componentDidHide', this)
  }

  navigateBack = () => {
    navigateBack()
  }

  async loadData() {
    const responseRes = await findPageList(this.state.pageNo)
    if (responseRes.head.ret === 0) {
      const data: IListResult<IResourceType> = responseRes.data
      const { result, prePage, hasPre } = data
      this.setState({ result, pageNo: prePage, hasPre })
    }
  }

  handleToggleStatus() {
    this.setState({ isEdit: !this.state.isEdit })
  }

  handleNewOrEdit(item) {
    this.props.indexStore.setEditResourceType(item || {})
    this.setState({ isEdit: false })
    navigateTo('/pages/index/pages/resource/pages/types-edit/index', { isEdit: item ? 1 : 0 })
  }

  render() {
    const { isEdit, result } = this.state
    return (
      <View className={[styles.container, 'container'].join(' ')}>
        <View className={styles.nav}>
          <AtNavBar
            color="#000"
            title="物资种类管理"
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
          {!result || result.length === 0 ? (
            <View className={styles.emptyText}>暂无添加物资类型</View>
          ) : (
            <ScrollView className={[styles.container, 'scroll-container'].join(' ')} scrollY={true}>
              {result.map((item, index) => {
                return (
                  <View className={styles.listItem} key={index}>
                    <View className={styles.itemContent}>
                      <View className={styles.title}>{item.name}</View>
                      <View className={styles.remark}>{item.remark}</View>
                    </View>
                    {isEdit && (
                      <View className={styles.itemTool}>
                        <View className={styles.btnWrap}>
                          <AtButton type="primary" size="small" onClick={this.handleNewOrEdit.bind(this, item)}>
                            编辑
                          </AtButton>
                        </View>
                        <View className={styles.btnWrap}>
                          <AtButton size="small">删除</AtButton>
                        </View>
                      </View>
                    )}
                  </View>
                )
              })}
            </ScrollView>
          )}
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
