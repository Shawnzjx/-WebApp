import Vue from 'vue'
import 'lib-flexible'
import {Button} from 'mint-ui'

import App from './App.vue'
import router from './router'
import Header from './components/Header'
import store from './vuex/store'
import i18n from './i18n'

Vue.config.productionTip = false

//注册全局组件
Vue.component('Header', Header)
Vue.component(Button.name, Button) // mt-button

new Vue({
  // vue的包是不需要带编译器的 整体的打包文件更小
  render: h => h(App),

  router, // 所有组件都能看到 $route 和 $router

  i18n,

  store // 所有组件都能看到 $store
}).$mount('#app')
