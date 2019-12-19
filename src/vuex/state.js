// 包含n个状态数据属性的对象

export default {
  latitude: 40.10038, //纬度
  longitude: 116.36867, //经度
  address: {}, //地址信息
  categorys: [], //分类数组
  shops: [], //商家数组
  user: {}, // 用户信息
  token: localStorage.getItem('token_key') || '', // 当前用户登录的标记
  goods: [], // 商家食物列表
  ratings: [], // 商家评价列表
  info: {}, // 商家信息
}