import Vue from 'vue'
import VueRouter from 'vue-router'
import Msite from '../pages/Msite/Miste.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'

//声明使用vue插件
Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',  //history模式 路径中没有#
  
  routes: [
    {
      path: '/', //重定向的主页
      redirect: '/msite'
    },
    {
      path: '/msite',
      component: Msite
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/profile',
      component: Profile
    },
  ]
})