import Vue from 'vue'
import App from './app.vue'
import router from './router'

// import './assets/styles/global.css';
// import './assets/images/fg.jpg';
import 'assets/styles/global.styl'
/* const root = document.createElement('div')
document.body.appendChild(root) */

// 全局路由切换
router.beforeEach((to, from, next) => {
  console.log('beforeEach invoked')
  next()
})

// 全局路由切换
router.beforeResolve((to, from, next) => {
  console.log('beforeResolve invoked')
  next()
})

// 导航跳转后
router.afterEach((to, from) => {
  console.log('afterEach invoked')
})

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#root')
