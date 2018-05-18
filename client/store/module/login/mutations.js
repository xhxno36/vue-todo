import * as types from './mutation-types'

const Mutations = {
  [types.SET_LOGIN_NUM] (state, {num, num2}) {
    console.log(num2)
    state.loginNum = num
  }
}

export default Mutations
