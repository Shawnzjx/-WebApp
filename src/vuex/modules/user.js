// 用户模块数据管理

//移入接口函数
import {
  reqAutoLogin,
} from '../../api'

// 函数常量名
import {
  RECEIVE_USER,
  RECEIVE_TOKEN,
  RESET_USER,
  RESET_TOKEN,
} from '../mutation-types'

export default {
  // user的state
  state: {
    user: {}, // 用户信息
    token: localStorage.getItem('token_key') || '', // 当前用户登录的标记
  },

  mutations: {
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
  },

  actions: {
    // 保存用户
    saveUser ({commit}, user) {
      const token = user.token
      // 将token保存到local中
      localStorage.setItem('token_key',token)
      // 删除user中的token
      delete user.token
      // 将user保存到state
      commit(RECEIVE_USER,{user})
      // 将token保存到state
      commit(RECEIVE_TOKEN,{token})
    },

    // 自动登录的异步action
    async autoLogin ({commit,state}) {
      // 必须要有token且没有user信息
      if (state.token && !state.user._id) {
        // 发送自动登录请求
        const result = await reqAutoLogin()
        //请求成功后
        if (result.code===0) {
          const user = result.data // 没有token
          commit(RECEIVE_USER,{user}) // 保存user
        }
      }
    },

    //退出登录
    logout ({commit}) {
      localStorage.removeItem('token_key')
      commit(RESET_USER)
      commit(RESET_TOKEN)
    },
  },

  getters: {},
}