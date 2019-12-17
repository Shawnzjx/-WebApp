<template>
  <div>
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.isShowFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from './components/FooterGuide'
export default {

  async mounted() {
    // 通知action异步获取address并保存state
    this.$store.dispatch('getAddress')
    // 分发 自动登录
    this.$store.dispatch('autoLogin')
  },
  components: {
    FooterGuide
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
