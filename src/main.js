import Vue from 'vue'
import 'lib-flexible'

import App from './App.vue'
import router from './router'
import Header from './components/Header'

Vue.config.productionTip = false

//注册全局组件
Vue.component('Header', Header)

new Vue({
  render: h => h(App), // vue的包是不需要带编译器的 整体的打包文件更小
  router, //所有组件都能看到 $route 和 $router
}).$mount('#app')
