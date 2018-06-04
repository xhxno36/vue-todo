import Vue from 'vue'
import Component from './func-notification'
const NofiticationConstructor = Vue.extend(Component)

const instances = []
let idtag = 1

const removeInstance = (instance) => {
  if (!instance) return
  const len = instances.length
  const index = instances.findIndex(inst => instance.id === inst.id)
  instances.splice(index, 1)

  if (len <= 1) return
  const removedHeight = instance.vm.height
  for (let i = index; i < len - 1; i++) {
    instances[i].verticalOffset = parseInt(instances[i].verticalOffset) - removedHeight - 16
  }
}

const notify = (options) => {
  // 如果是服务端 不去执行 因为要操作DOM
  if (Vue.prototype.$isServer) return
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
  instance.vm.visible = true
  // 计算高度
  let verticalOffset = 0
  instances.forEach(item => {
    verticalOffset += item.$el.offsetHeight + 16
  })

  verticalOffset += 16
  instance.verticalOffset = verticalOffset
  instances.push(instance)
  instance.vm.$on('closed', () => {
    removeInstance(instance)
    document.body.removeChild(instance.vm.$el)
    instance.vm.$destroy()
  })

  instance.vm.$on('close', () => {
    instance.visible = false
  })
  return instance.vm
}
export default notify
