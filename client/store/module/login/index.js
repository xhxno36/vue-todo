import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

export default () => ({
  // 使用命名空间
  namespaced: true,
  state,
  getters,
  mutations,
  actions
})
