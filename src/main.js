import Vue from 'vue'
import 'lib-flexible/flexible'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  render: h => h(App), // vue的包是不需要带编译器的 整体的打包文件更小
  router,
}).$mount('#app')
