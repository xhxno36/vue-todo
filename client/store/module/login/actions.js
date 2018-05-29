import * as types from './mutation-types'

const Actions = {
  setLoginNumAsync (store, data) {
    setTimeout(() => {
      store.commit(`${types.SET_LOGIN_NUM}`, {
        num: data.num
      })
    }, data.time)
  },
  setLoginNumAsyncGlobal: {
    // 将命名模块的方法 绑定到全局下
    root: true,
    handler (context, payload) {
      console.log('setLoginNumAsyncGlobal')
      // console.log(context)
      console.log(payload)
    }
  }
}

export default Actions
