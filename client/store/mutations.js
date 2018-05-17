import * as types from './mutation-types'

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
