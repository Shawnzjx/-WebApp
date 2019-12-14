// vue.config.js
const path = require('path')
const px2rem = require('postcss-px2rem')// 配置postcs-px2rem

//设计稿等分之后的值, 等分的比例同页面rem的比例是一致的
const postcss = px2rem({ 
  //基准大小 baseSize，需要和rem.js中单位rem值占比一样相同
  remUnit: 37.5   
})

module.exports = {  //只写vue封装的配置

  // runtimeCompiler: true,
  lintOnSave: false, // 关闭Eslint提示
  css: { // 添加postcss配置
    loaderOptions: {
      postcss: {
        plugins: [
          postcss
        ]
      }
    }
  },

  //webpack原生配置
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'], // 可以省略的后缀名
      alias: { // 路径别名(简写方式)
        // 'vue$': 'vue/dist/vue.esm.js',  // 表示精准匹配   带vue编译器
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
      }
    }
  },

  devServer: {
    proxy: {
      // 处理以/api开头路径的请求
      // '/api': 'http://localhost:4000'   // http://localhost:4000/api/search/users
      '/api': {
        target: 'http://localhost:4000', // 转发的目标地址
        pathRewrite: {
          '^/api' : ''  // 转发请求时去除路径前面的/api
        },
        changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
      },
    }
  }
}