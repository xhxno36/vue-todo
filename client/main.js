import Vue from 'vue'
import App from './app.vue'
import router from './router'
// import store from './store'

// import './assets/styles/global.css';
// import './assets/images/fg.jpg';
import 'assets/styles/global.styl'
/* const root = document.createElement('div')
document.body.appendChild(root) */

// 全局路由切换
router.beforeEach((to, from, next) => {
  console.log('global beforeEach invoked')
  next()
})

// 全局路由切换 和beforeEach 区别是在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。
router.beforeResolve((to, from, next) => {
  console.log('global beforeResolve invoked')
  next()
})

// 导航跳转后
router.afterEach((to, from) => {
  console.log('global afterEach invoked')
})

new Vue({
  router,
  // store,
  render: (h) => h(App)
}).$mount('#root')
