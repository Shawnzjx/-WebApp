// vuex 最核心的管理对象 store
import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

import msite from './modules/msite'
import user from './modules/user'
import shop from './modules/shop'

//声明使用插件
Vue.use(Vuex)

export default new Vuex.Store({
  mutations, // 总的mutations 内部看到的是总的state
  actions, // 总的actions  内部看到的是总的state
  getters, // 总的getters

  // 自定的多模块vuex
  modules: {
    msite,
    user,
    shop
  }
})

/**
 * 总的state的结构(模拟)
 * {
 *    msite: {a:1},
 *    user: {b: 'ataa'}
 *    shop: {c: []}
 * }
 */
