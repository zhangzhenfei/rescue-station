import { View, ScrollView, Image } from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { IMaterials } from './interface'

import { FILE_HOST } from '@/consts'

const styles = require('./index.module.scss')

class AreaSelect extends Component<IMaterials> {
  constructor() {
    super(...arguments)
  }

  componentDidMount() {}

  componentWillReceiveProps() {}

  onMaskClick() {}

  render() {
    const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    return (
      <ScrollView className={[styles.container, 'scroll-container'].join(' ')} scrollY={true}>
        <View className={styles.content}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(i => {
            return (
              <View className={styles.listItem} key={i}>
                <Image mode="aspectFit" lazyLoad={true} className={styles.img} />
                <View className={styles.listContent}>
                  <View>
                    <View className={styles.listTitle}>消防战斗服</View>
                    <View className={styles.listDesc}>NA-02</View>
                  </View>
                  <View className={styles.address}>剩余12个</View>
                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
    )
  }
}

export default AreaSelect
