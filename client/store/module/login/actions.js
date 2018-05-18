import * as types from './mutation-types'

const Actions = {
  setLoginNumAsync (store, data) {
    setTimeout(() => {
      store.commit(`${types.SET_LOGIN_NUM}`, {
        num: data.num
      })
    }, data.time)
  }
}

export default Actions
