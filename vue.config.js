// vue.config.js
const px2rem = require('postcss-px2rem')// 配置postcs-px2rem
const postcss = px2rem({ //设计稿等分之后的值, 等分的比例同页面rem的比例是一致的
  remUnit: 37.5   //基准大小 baseSize，需要和rem.js中单位rem值占比一样相同
})

module.exports = {
  // runtimeCompiler: true,
  // lintOnSave: false, // 关闭Eslint提示
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
  configureWebpack: {}

}