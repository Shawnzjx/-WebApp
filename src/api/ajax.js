// 对axios进行二次封装一个能发ajax请求的函数(axios原本就封装了原生ajax)
import axios from 'axios'
//查询字符串的包
import qs from 'qs'
import {Indicator} from 'mint-ui'

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
    Indicator.close()

    // 1. 统一处理异常
    alert('请求出错: '+ error.message)
    return new Promise(()=>{}) // 返回一个pending状态的promise  中断promise链
  }
)

export default instance
