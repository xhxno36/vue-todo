export default {
  loginNum: state => state.loginNum,
  fullName: (state, getters, rootState) => `${state.loginFirstName} ${state.loginLastName} - ${rootState.firstName} ${rootState.lastName}`
}
