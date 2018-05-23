import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'

import 'assets/styles/global.styl'

export default () => {
  const app = new Vue({
    router,
    store,
    render: (h) => h(App)
  })

  return {app, router, store}
}
