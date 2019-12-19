// 包含n个用于直接更新状态数据的方法的对象
// 方法不包含异步和逻辑处理代码
import Vue from 'vue'

// 函数常量名
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RESET_USER,
  RESET_TOKEN,
  RECEIVE_GOODS,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  ADD_FOOD_COUNT,
  REDUCE_FOOD_COUNT
} from './mutation-types'

export default {

  [RECEIVE_ADDRESS] (state,address) {
    state.address = address
  },
  [RECEIVE_CATEGORYS] (state,categorys) {
    state.categorys = categorys
  },
  [RECEIVE_SHOPS] (state,shops) {
    state.shops = shops
  },
  
  [RECEIVE_USER] (state,{user}) {
    state.user = user
  },
  [RECEIVE_TOKEN] (state,{token}) {
    state.token = token
  },

  [RESET_USER] (state) {
    state.user = {}
  },
  [RESET_TOKEN] (state) {
    state.token = ''
  },

  [RECEIVE_GOODS] (state,{goods}) {
    state.goods = goods
  },
  [RECEIVE_RATINGS] (state,{ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_INFO] (state,{info}) {
    state.info = info
  },

  [ADD_FOOD_COUNT] (state,{food}) {
    if (food.count) { // food有count
      food.count++
    } else { 
      // 如果food中没有count, 给food添加count属性(新添加) 值为1
      // 问题: 给响应式对象添加一个新的属性, 没有数据绑定效果(不是响应式的)
      // food.count = 1
      // 解决: 给响应式对象添加一个响应式属性 Vue.set(target,key,value)
      Vue.set(food,'count',1)
    }
  },
  [REDUCE_FOOD_COUNT] (state,{food}) {
    if (food.count>0) {
      food.count--
    }
  },
}