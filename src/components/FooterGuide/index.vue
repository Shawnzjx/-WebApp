<template>
  <footer class="footer-guide">
    <div class="guide-item" :class="{on: $route.path==='/msite'}" @click="goto('/msite')">
      <span>
        <i class="iconfont icon-waimai"></i>
      </span>
      <span>{{$t('footer_msite')}}</span>
    </div>
    <div class="guide-item" :class="{on: $route.path==='/search'}" @click="goto('/search')">
      <span>
        <i class="iconfont icon-search"></i>
      </span>
      <span>{{$t('footer_search')}}</span>
    </div>
    <div class="guide-item" :class="{on: $route.path==='/order'}" @click="goto('/order')">
      <span>
        <i class="iconfont icon-dingdan"></i>
      </span>
      <span>{{$t('footer_order')}}</span>
    </div>
    <div class="guide-item" :class="{on: $route.path==='/profile'}" @click="goto('/profile')">
      <span>
        <i class="iconfont icon-geren"></i>
      </span>
      <span>{{$t('footer_profile')}}</span>
    </div>
  </footer>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'FooterGuide',

    methods: {
      goto(path){
        // 点击的路径不重复
        if (path!==this.$route.path) {
          // 传对应的路径 编程式路由跳转
          this.$router.replace(path)
        } else {
          // 如果请求的是当前的, 直接强制刷新
          window.location = path 
        }
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .footer-guide
    top-border-1px(#cccccc)
    position fixed
    z-index 50
    left 0
    bottom 0
    width 100%
    height 50px
    display flex
    background #fff
    .guide-item
      display flex
      // 垂直方向为主轴
      flex-direction column
      text-align center
      width 25%
      &.on
        color $green
      span
        margin-top 4px
        font-size 12px
        .iconfont
          font-size 22px
</style>
