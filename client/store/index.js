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

export default new Vuex.Store({
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
