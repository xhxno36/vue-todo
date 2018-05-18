import * as types from './mutation-types'

// 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)
// mutation 必须是同步函数
const mutations = {
/*   [types.SET_SINGER] (state, singer) {
    state.singer = singer
  }, */
  [types.UPDATE_STATE_NUM] (state, { num, num2 }) {
    console.log(num2)
    state.stateNum = num
  }
}

export default mutations
