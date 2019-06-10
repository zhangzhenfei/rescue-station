import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, ScrollView, Image } from '@tarojs/components'
import { AtForm, AtInput, AtNavBar, AtTextarea, AtButton } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import InputWrap from '@/components/InputWrap'
import { uploadFile } from '@/utils/upload'
import { saveOrUpdate } from './api'
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
    navigationBarTitleText: '新增物资'
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

  async handleSave() {
    const responseRes = await saveOrUpdate(this.props.indexStore.editMaterial)
    if (responseRes.head.ret === 0) {
      Taro.showToast({ title: `${this.state.isEdit ? '修改' : '新增'}成功`, icon: 'none' })
      setTimeout(() => {
        this.navigateBack()
      }, 1000)
    }
  }

  async handleChooseImage() {
    const result = await Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'] // 可以指定来源是相册还是相机，默认二者都有
    })
    const url = await uploadFile(result.tempFiles[0])
    this.changeFromEvt('img', url)
  }

  handleClassSelect() {
    navigateTo('/pages/index/pages/materials-class/index')
  }

  render() {
    const { isEdit } = this.state
    const {
      indexStore: { editMaterial }
    } = this.props
    return (
      <View className={[styles.container, 'container'].join(' ')}>
        <View>
          <AtNavBar
            color="#000"
            title={`${isEdit ? '编辑' : '新增'}物资`}
            leftIconType="chevron-left"
            onClickLeftIcon={this.navigateBack.bind(this)}
          />
        </View>
        <View className={styles.wrap}>
          <ScrollView className="scroll-container" scrollY={true}>
            <AtForm className={styles.form}>
              <View className={[styles.row, styles.split].join(' ')}>
                <InputWrap title="名称">
                  <AtInput
                    name="name"
                    type="text"
                    value={editMaterial.name}
                    placeholder="请输入名称"
                    onChange={this.changeFromEvt.bind(this, 'name')}
                  />
                </InputWrap>
              </View>
              <View className={styles.row}>
                <InputWrap title="图片">
                  <View className={styles.uploadWrap} onClick={this.handleChooseImage.bind(this)}>
                    <View className={styles.imgWrap}>
                      {editMaterial.img && (
                        <Image mode="scaleToFill" src={editMaterial.img} lazyLoad={true} className={styles.img} />
                      )}
                    </View>
                  </View>
                </InputWrap>
              </View>
              <View className={styles.row}>
                <InputWrap title="种类" moreIcon={true}>
                  <AtInput
                    name="mtId"
                    type="text"
                    value={editMaterial.typeName}
                    placeholder="请选择"
                    editable={false}
                    onClick={this.handleClassSelect.bind(this)}
                    onChange={this.changeFromEvt.bind(this, 'mtId')}
                  />
                </InputWrap>
              </View>
              <View className={styles.row}>
                <InputWrap title="型号">
                  <AtInput
                    name="model"
                    type="text"
                    value={editMaterial.model}
                    placeholder="请输入型号"
                    onChange={this.changeFromEvt.bind(this, 'model')}
                  />
                </InputWrap>
              </View>
              <View className={styles.row}>
                <InputWrap title="品牌" require={false}>
                  <AtInput
                    name="brand"
                    type="text"
                    value={editMaterial.brand}
                    placeholder="请输入"
                    onChange={this.changeFromEvt.bind(this, 'brand')}
                  />
                </InputWrap>
              </View>
              <View className={[styles.row, styles.split, styles.textAreaWrap].join(' ')}>
                <View className={styles.title}>用途</View>
                <AtTextarea
                  count={true}
                  value={editMaterial.purpose}
                  maxLength={200}
                  placeholder="请输入描述"
                  onChange={this.changeFromEvt.bind(this, 'purpose')}
                />
              </View>
              <View className={[styles.row, styles.split, styles.textAreaWrap].join(' ')}>
                <View className={styles.title}>描述</View>
                <AtTextarea
                  count={true}
                  value={editMaterial.remark}
                  maxLength={200}
                  placeholder="请输入描述"
                  onChange={this.changeFromEvt.bind(this, 'remark')}
                />
              </View>
            </AtForm>
          </ScrollView>
        </View>
        <AtButton type="primary" className={styles.btn} onClick={this.handleSave.bind(this)}>
          确定
        </AtButton>
      </View>
    )
  }
}

export default Index as ComponentType
