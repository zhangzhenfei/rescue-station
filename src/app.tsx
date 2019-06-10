import Taro, { Component, Config } from '@tarojs/taro'
import { Provider } from '@tarojs/mobx'
import Index from './pages/splash'

import '@/assets/scss/custom-variables.scss'

import counterStore from './store/counter'
import indexStore from './store/index'

import '@tarojs/async-await'
import './app.scss'

// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5') {
  require('nerv-devtools')
}

const store = {
  counterStore,
  indexStore
}

class App extends Component {
  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/login/index', // 登录
      'pages/index/index', // 主页
      'pages/index/pages/types/index', // 物资种类管理
      'pages/index/pages/types-edit/index', // 物资新增/编辑
      'pages/index/pages/materials/index', // 物资管理
      'pages/index/pages/materials-detail/index', // 物资详情
      'pages/index/pages/materials-edit/index', // 物资新增/编辑
      'pages/index/pages/materials-class/index', // 物资种类选择
      'pages/index/pages/cabinet/index', // 机柜管理
      'pages/cabinet/index', // 机柜
      'pages/cabinet/pages/detail/index', // 机柜详情
      'pages/cabinet/pages/materials/index', // 物资列表
      'pages/cabinet/pages/material-in/index', // 物资入柜
      'pages/cabinet/pages/material-out/index', // 物资出柜
      'pages/cabinet/pages/material-change/index', // 物资更换
      'pages/cabinet/pages/material-details/index', // 物资详情列表
      'pages/cabinet/pages/material-batchs/index', // 物资批次列表
      'pages/map/index', // 地图
      'pages/mine/index', // 我的
      'pages/splash/index' // 欢迎页
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#cc2c3b',
      navigationBarTitleText: '智能消防柜',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      color: '#999999',
      selectedColor: '#333333',
      borderStyle: 'white',
      backgroundColor: '#ffffff',
      list: [
        {
          text: '首页',
          pagePath: 'pages/index/index',
          iconPath: 'assets/img/common_ic_home.png',
          selectedIconPath: 'assets/img/common_ic_home_pre.png'
        },
        {
          text: '机柜',
          pagePath: 'pages/cabinet/index',
          iconPath: 'assets/img/common_ic_guizi.png',
          selectedIconPath: 'assets/img/common_ic_guizi_pre.png'
        },
        {
          text: '地图',
          pagePath: 'pages/map/index',
          iconPath: 'assets/img/common_ic_map.png',
          selectedIconPath: 'assets/img/common_ic_map_pre.png'
        },
        {
          text: '我的',
          pagePath: 'pages/mine/index',
          iconPath: 'assets/img/common_ic_me.png',
          selectedIconPath: 'assets/img/common_ic_me_pre.png'
        }
      ]
    }
  }

  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render() {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
