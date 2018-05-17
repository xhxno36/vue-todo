export default {
  updateStateNumAsync (store, data) {
    setTimeout(() => {
      store.commit('UPDATE_STATE_NUM', {
        num: data.num
      })
    }, data.time)
  }
}
