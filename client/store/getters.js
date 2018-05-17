// export const singer = state => state.singer
// export const stateNum = state => state.stateNum
export default {
  stateNum: state => state.stateNum,
  fullName: state => `${state.firstName} ${state.lastName}`
}
