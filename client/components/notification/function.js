import Vue from 'vue'
import Component from './func-notification'
const NofiticationConstructor = Vue.extend(Component)

const instances = []
let idtag = 1
const notify = (options) => {
  if (Vue.prototype.$isServer) {
    // 如果是服务端 不去执行 因为要操作DOM
    return false
  }
  const {autoClose, ...rest} = options
  const instance = new NofiticationConstructor({
    propsData: {
      ...rest
    },
    data: {
      autoClose: autoClose === undefined ? 3000 : autoClose
    }
  })

  const id = `notification_${idtag++}`
  instance.id = id
  instance.vm = instance.$mount()
  document.body.appendChild(instance.vm.$el)
  // 计算高度
  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })

  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  return instance.vm
}
export default notify
