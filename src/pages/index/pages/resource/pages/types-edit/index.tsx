import { ComponentType } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtForm, AtInput, AtNavBar, AtTextarea, AtButton } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'

import InputWrap from '@/components/InputWrap'

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

@inject('indexStore')
@observer
class Index extends Component {
  config: Config = {
    navigationBarTitleText: '新增物资种类'
  }

  componentWillReceiveProps() {}

  componentWillReact() {}

  componentDidMount() {}

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

  handleSave() {
    console.log(this)
  }

  render() {
    const {
      indexStore: { editResourceType }
    } = this.props
    return (
      <View className={[styles.container, 'container'].join(' ')}>
        <View>
          <AtNavBar
            color="#000"
            title="新增物资种类"
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
              <textarea onChange={this.changeFromEvt.bind(this, 'remark')} />
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
