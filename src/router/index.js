import Vue from 'vue'
import VueRouter from 'vue-router'
import Msite from '../pages/Msite/Miste.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import Goods from '../pages/Shop/children/Goods.vue'
import Ratings from '../pages/Shop/children/Ratings.vue'
import Info from '../pages/Shop/children/Info.vue'

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
      component: Msite,
      meta: {isShowFooter: true}
    },
    {
      path: '/search',
      component: Search,
      meta: {isShowFooter: true}
    },
    {
      path: '/order',
      component: Order,
      meta: {isShowFooter: true}
    },
    {
      path: '/profile',
      component: Profile,
      meta: {isShowFooter: true}
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '',
          redirect: '/shop/goods'
        },
        {
          path: '/shop/goods',
          component: Goods
        },
        {
          path: '/shop/ratings',
          component: Ratings
        },
        {
          path: '/shop/info',
          component: Info
        },
      ]
    }
  ]
})