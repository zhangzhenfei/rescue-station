import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Image, Text } from '@tarojs/components'
import { AtForm, AtInput, AtNavBar, AtTextarea, AtButton } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import InputWrap from '@/components/InputWrap'
import { navigateTo } from '@/utils/common'

const styles = require('./index.module.scss')

interface IState {
  isEdit: number
}

type PageStateProps = {
  indexStore: {
    editMaterial: any
    selectedClass: any
    setEditMaterial: Function
    setSelectedClass: Function
  }
}

interface Index {
  props: PageStateProps
}

@inject('indexStore')
@observer
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '物资详情'
  }

  public state: IState = {
    isEdit: 0
  }

  componentWillReceiveProps() {}

  componentWillReact() {}

  componentDidMount() {
    const { isEdit } = this.$router.params
    isEdit && this.setState({ isEdit: parseInt(isEdit) })
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  navigateBack = () => {
    Taro.navigateBack()
  }

  changeFromEvt = (key, evt) => {
    const value = (evt.target && evt.target.value) || evt
    this.props.indexStore.setEditMaterial({
      ...this.props.indexStore.editMaterial,
      [key]: value
    })
  }

  handleClassSelect() {
    navigateTo('/pages/index/pages/materials-class/index')
  }

  render() {
    const {
      indexStore: { editMaterial }
    } = this.props
    return (
      <View className={[styles.container, 'container'].join(' ')}>
        <View>
          <AtNavBar
            color="#000"
            title="物资详情"
            leftIconType="chevron-left"
            onClickLeftIcon={this.navigateBack.bind(this)}
          />
        </View>
        <View className={styles.wrap}>
          <ScrollView className="scroll-container" scrollY={true}>
            <View className={styles.item}>
              <View className={styles.name}>{editMaterial.name}</View>
              <View className={styles.info}>种类：{editMaterial.typeName}</View>
              <View className={styles.info}>型号：{editMaterial.model}</View>
              <View className={styles.info}>品牌：{editMaterial.brand}</View>
              <View className={styles.info}>用途：{editMaterial.purpose}</View>
              <View className={styles.info}>备注：{editMaterial.remark}</View>
              <View className={styles.info}>创建人：{editMaterial.userName}</View>
              <View className={styles.info}>创建时间：{editMaterial.createDate}</View>
              <Image mode="scaleToFill" src={editMaterial.img} lazyLoad={true} className={styles.img} />
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default Index as ComponentType
