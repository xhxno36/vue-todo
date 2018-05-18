import * as types from './mutation-types'

export default {
  updateStateNumAsync (store, data) {
    setTimeout(() => {
      // 相当组件里面的methods
      // Action 可以包含任意异步操作。
      // Action 提交的是 mutation，而不是直接变更状态。
      store.commit(`${types.UPDATE_STATE_NUM}`, {
        num: data.num
      })
    }, data.time)
  }
}
