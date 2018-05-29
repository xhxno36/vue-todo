import Vue from 'vue'
import Vuex from 'vuex'

// import * as actions from './actions'
import actions from './actions'
// import * as getters from './getters'
import getters from './getters'
// import * as state from './state'
import state from './state'
// import * as mutations from './mutations'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

import craeteLoginStore from './module/login'

const loginStore = craeteLoginStore()

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    login: loginStore
  },
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})

// 让vuex支持热重载
if (module.hot) {
  module.hot.accept([
    './state',
    './getters',
    './actions',
    './mutations',
    './module/login'
  ], () => {
    // 获取更新后的模块
    const newState = require('./state').default
    const newGetters = require('./getters').default
    const newActions = require('./actions').default
    const newMutations = require('./mutations').default
    const newLogin = require('./module/login').default

    // 加载新模块
    store.hotUpdate({
      state: newState,
      getters: newGetters,
      actions: newActions,
      mutations: newMutations,
      modules: {
        login: newLogin()
      }
    })
  })
}

export default store
