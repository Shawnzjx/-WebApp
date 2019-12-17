import Vue from 'vue'
import 'lib-flexible'
import {Button} from 'mint-ui'

import App from './App.vue'
import router from './router'
import Header from './components/Header'
import Star from './components/Star'
import store from './vuex/store'
import './validate'
import * as API from './api' // 使用这种暴露方法可以将所暴露的数据方法API对象中
import i18n from './i18n'

Vue.config.productionTip = false

// 将API对象挂载到Vue的原型对象上
Vue.prototype.$API = API

//注册全局组件
Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component(Button.name, Button) // mt-button

new Vue({
  // vue的包是不需要带编译器的 整体的打包文件更小
  render: h => h(App),

  router, // 所有组件都能看到 $route 和 $router

  i18n, // 所有组件都能看到 $i18n

  store // 所有组件都能看到 $store
}).$mount('#app')
