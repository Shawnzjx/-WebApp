<template>
  <div>
    <div class="goods">
      <!-- 菜单容器 -->
      <div class="menu-wrapper" ref="left">
        <ul ref="leftUl">
          <!-- current 当前分类下标 -->
          <li class="menu-item"
            v-for="(good, index) in goods" :key="good.name"
            :class="{current: index===currentIndex}"
            @click="clickItem(index)">
            <span class="text bottom-border-1px">
              <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>

      <!-- 食品容器 -->
      <div class="foods-wrapper" ref="right">
        <ul ref="rightUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food, index) in good.foods" 
                :key="index" @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price"> 
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart/>
    </div>
    <!-- 组件标签对象就是组件对象 -->
    <Food :food="food" ref="food"/>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import {mapState} from 'vuex'
  import Food from '../../../components/Food'
  import ShopCart from '../../../components/ShopCart'

  export default {

    data() {
      return {
        // 右侧列表滑动的Y轴坐标: scrollY 在滑动过程中不断改变
        scrollY: 0,
        // 右侧每个分类的 li 的top值的数组tops 第一次列表显示后统计后面不再变化
        tops: [],
        // 需要显示的food
        food: {},
      }
    },
    
    computed: {
      ...mapState({
        goods: state => state.shop.goods
      }),

      currentIndex () {
        const {scrollY,tops} = this

        // Array.findIndex()  查找数组下标的方法  传一个callback  返回值为布尔类型
        const index =  tops.findIndex((top,index)=> scrollY>=top && scrollY<tops[index+1])
        // 存之前下标应不同  并且在计算属性的初始时要定义好leftScroll 否则找不到undefined
        if (index!==this.index && this.leftScroll) {
          // 存取新的下标
          this.index = index
          // 让左侧列表滑动到当前分类处
          const li = this.$refs.leftUl.children[index]
          this.leftScroll.scrollToElement(li, 300)
        }

        return index
      }
    },

    methods: {
      // 初始化滑动
      initScroll () {
        this.leftScroll = new BScroll(this.$refs.left, {  // 也可以传类名
          // 配置自定义的click事件
          click: true
        })
        this.rightScroll = new BScroll(this.$refs.right, {
          click: true,

          // 触发时机  probeType
          probeType: 1, // 非实时  触摸
          // probeType: 2, // 实时   触摸
          // probeType: 3, // 实时  触摸   惯性
        })

        // 给右侧列表绑定scroll监听
        this.rightScroll.on('scroll', ({x, y})=> {
          console.log('scroll', x, y)
          this.scrollY = Math.abs(y)
        })

        // 给右侧列表绑定scrollEnd监听
        this.rightScroll.on('scrollEnd', ({x, y})=> {
          console.log('scrollEnd', x, y)
          this.scrollY = Math.abs(y)
        })
      },

      // 统计右侧所有分类li的tops数组
      initTops () {
        const tops = []
        let top = 0
        tops.push(top)

        // .children 所有子元素的伪数组 
        // Array.from(this.$refs.rightUl.children)  // 将伪数组变为真数组 es6
        const lis = Array.prototype.slice.call(this.$refs.rightUl.children)  // es5
        lis.forEach(li => {
          top += li.clientHeight
          tops.push(top)
        });

        // 更新tops数组
        this.tops = tops
        console.log('tops', tops)
      },

      // 事件的回调函数
      clickItem (index) {
        //得到对应的top
        const top = this.tops[index]

        // 立即更新scrollY为目标值(立即选中当前分类项)
        this.scrollY = top

        // 让右侧列表滑动到对应的位置
        this.rightScroll.scrollTo(0, -top , 300)
      },

      /*
        父组件调用子组件的方法: ref
        子组件调用父组件的方法: props
      */
      // 显示food
      showFood (food) {
        // 更新数据
        this.food = food
        // 显示food组件界面
        this.$refs.food.toggleShow()
      }
    },

    watch: {
      goods () {  // goods数据有了
        this.$nextTick(()=> {  // 列表数据显示了
          this.initScroll()
          this.initTops()
        })
      }
    },

    components: {
      Food,
      ShopCart,
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
