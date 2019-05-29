import { View, ScrollView } from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'
import { AtButton } from 'taro-ui'
import { IMaterials } from './interface'

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
        {list.map(li => (
          <View className={styles.item}>
            <View className={[styles.item, styles.active].join(' ')}>北京</View>
            <View className={styles.item}>天津</View>
          </View>
        ))}
      </ScrollView>
    )
  }
}

export default AreaSelect
