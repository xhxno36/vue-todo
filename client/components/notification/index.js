import Notification from './notification.vue'
import notify from './function'

// Vue插件
export default (Vue) => {
  Vue.component(Notification.name, Notification)
  // 注册到全局 可在组件内部使用 this.$notify
  Vue.prototype.$notify = notify
}
