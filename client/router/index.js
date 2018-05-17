import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

export default new VueRouter({
  routes,
  mode: 'history'
  // base: '/client/'
  // 路由切换时
  // 如何设置页面滚动行为
  /* scrollBehavior: (to, from, savedPosition) => {
    // to: 要去哪个路由
    // from: 从哪个路由进来的
    // savedPosition: 是否有滚动的行为

    if (savedPosition) {
      // 如果有 下次切换回来返回保存的滚动条的位置
      return savedPosition
    } else {
      // 否则滚动到页面顶部
      return {x: 0, y: 0}
    }
  } */
  // 如果浏览器不支持history这种方式的路由，则使用hash的方式来设置路由
  // fallback: true
  /*
  // 设置路由参数的解析
  // string->json
  parseQuery (query) {

  },
  // json->string
  stringifyQuery (obj) {

  } */
  // linkActiveClass: 'router-link-active',
  // linkExactActiveClass: 'router-link-exact-active'
})
