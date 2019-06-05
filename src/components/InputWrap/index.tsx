import { View, Text, Image } from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'
import { FILE_HOST } from '@/consts/index'

import { IInput } from './interface'

const styles = require('./index.module.scss')

class InputWrap extends Component<IInput> {
  constructor(props) {
    super(...arguments)
  }

  componentDidMount() {}

  // 设置默认属性
  static defaultProps: IInput = {
    require: true,
    moreIcon: false
  }

  render() {
    const { title, require, moreIcon } = this.props
    return (
      <View className={styles.wrap}>
        {title && (
          <View className={styles.title}>
            {require && <Text className={styles.require}>*</Text>}
            <Text>{title}</Text>
          </View>
        )}
        <View className={styles.content}>{this.props.children}</View>
        {moreIcon && <Image className={styles.arrow} src={`${FILE_HOST}common_ic_nnarrow.png`} />}
      </View>
    )
  }
}

export default InputWrap
