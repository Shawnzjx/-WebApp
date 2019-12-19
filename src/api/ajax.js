// 对axios进行二次封装一个能发ajax请求的函数(axios原本就封装了原生ajax)
/*
  1. 统一处理请求异常
  2. 异步请求成功的数据不是response, 而是response.data
  3. 对请求体参数进行urlencode处理, 而不使用默认的json模式(后台接口不支持)
  4. 配置请求超时时间
  5. 通过请求头携带token数据
  6. 请求加载
*/
import axios from 'axios'
//查询字符串的包
import qs from 'qs'
import {Indicator,Toast,MessageBox} from 'mint-ui'

import store from '../vuex/store'
import router from '../router'

const instance = axios.create({
  // baseURL: 'http://localhost:4000' // 出跨域请求

  baseURL: '/api', //让代理服务器转发请求4000
  // 4. 配置请求超时时间
  timeout: 20000
})

//  添加请求拦截器 (统一处理请求参数)
instance.interceptors.request.use((config)=> {
  // 显示请求loading
  Indicator.open({
    text: '加载中...',
    spinnerType: 'fading-circle'
  })
  
  const data = config.data
  // 3. 对请求体参数进行urlencode处理,而不使用默认的json方式(后台接口不支持)
  if (data instanceof Object) {
    config.data = qs.stringify(data)
  }

  // 5. 通过请求头携带token
  const token = store.state.user.token
  //有token就携带
  if (token) {
    config.headers['Authorization'] = token
  } else {
    // 如果当前接口需要token校验, 但没有token, 不发请求,进入错误流程
    const needCheck = config.headers.needCheck
    if (needCheck) {
      throw new Error('未登录')
    }
  }

  return config
})

//添加响应拦截器
instance.interceptors.response.use(
  response=> {
    //结束loading
    Indicator.close()
    // return response
    // 2. 异步请求成功的数据不是response, 而是response.data
    return response.data
  },
  error=> {
    //结束loading
    Indicator.close()

    const response = error.response
    if (!response) { // 没发请求的错误
      const path = router.currentRoute.path  // 路由信息对象
      if (path!=='/login') {
        router.replace('/login')
      }
    } else { // 发了请求的错误
      // 如果响应状态码为401(请求没有权限) 且没在当前没在登录页面 退出登录(清除数据/跳出登录页面)
      if (error.response.status===401) {
        const path = router.currentRoute.path
        if (path!=='/login') {
          store.dispatch('logout')
          router.replace('/login')
          Toast(error.response.data.message || '登录失效,请重新登录')
        }
      } else if (error.response.status===404) { // status为 404  提示访问资源不存在
        MessageBox('提示','访问资源不存在')
      } else {
        // 1. 统一处理异常
        MessageBox('提示','请求出错: '+ error.message)
      }
    }

    

    return new Promise(()=>{}) // 返回一个pending状态的promise  中断promise链
  }
)

export default instance
