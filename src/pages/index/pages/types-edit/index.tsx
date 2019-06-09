import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtForm, AtInput, AtNavBar, AtTextarea, AtButton } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import InputWrap from '@/components/InputWrap'

import { saveOrUpdate } from './api'

const styles = require('./index.module.scss')

interface IState {
  isEdit: number
}

type PageStateProps = {
  indexStore: {
    editResourceType: any
    setEditResourceType: Function
  }
}

interface Index {
  props: PageStateProps
}

@inject('indexStore')
@observer
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '新增物资种类'
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
    this.props.indexStore.setEditResourceType({
      ...this.props.indexStore.editResourceType,
      [key]: value
    })
  }

  async handleSave() {
    const responseRes = await saveOrUpdate(this.props.indexStore.editResourceType)
    if (responseRes.head.ret === 0) {
      Taro.showToast({ title: `${this.state.isEdit ? '修改' : '新增'}成功`, icon: 'none' })
      setTimeout(() => {
        this.navigateBack()
      }, 1000)
    }
  }

  render() {
    const { isEdit } = this.state
    const {
      indexStore: { editResourceType }
    } = this.props
    return (
      <View className={[styles.container, 'container'].join(' ')}>
        <View>
          <AtNavBar
            color="#000"
            title={`${isEdit ? '编辑' : '新增'}物资种类`}
            leftIconType="chevron-left"
            onClickLeftIcon={this.navigateBack.bind(this)}
          />
        </View>
        <View className={styles.wrap}>
          <AtForm className={styles.form}>
            <View className={styles.row}>
              <InputWrap title="名称">
                <AtInput
                  name="name"
                  type="text"
                  value={editResourceType.name}
                  placeholder="请输入名称"
                  onChange={this.changeFromEvt.bind(this, 'name')}
                />
              </InputWrap>
            </View>
            <View className={[styles.row, styles.textAreaWrap].join(' ')}>
              <View className={styles.title}>描述</View>
              <AtTextarea
                count={true}
                value={editResourceType.remark}
                maxLength={200}
                placeholder="请输入描述"
                onChange={this.changeFromEvt.bind(this, 'remark')}
              />
            </View>
          </AtForm>
        </View>
        <AtButton type="primary" className={styles.btn} onClick={this.handleSave.bind(this)}>
          确定
        </AtButton>
      </View>
    )
  }
}

export default Index as ComponentType
