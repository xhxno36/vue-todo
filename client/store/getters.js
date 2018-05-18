// getters相当于组件里面的computed
// 组件里面访问 this.$store.getters.fullName
// export const singer = state => state.singer
// export const stateNum = state => state.stateNum
export default {
  stateNum: state => state.stateNum,
  fullName: state => `${state.firstName} ${state.lastName}`
}
