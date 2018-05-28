import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import VueMeta from 'vue-meta'
import 'assets/styles/global.styl'

// 使用vue-meta插件去设置渲染页面的tkd参数（seo有用）
Vue.use(VueMeta)
export default () => {
  const app = new Vue({
    router,
    store,
    render: (h) => h(App)
  })

  return {app, router, store}
}
