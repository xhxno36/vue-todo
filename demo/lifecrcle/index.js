import Vue from 'vue'

// 详细生命周期解释 https://cn.vuejs.org/v2/api/#选项-生命周期钩子
const app = new Vue({
  el: '#root',
  // template: '<div>{{message}}</div>',
  data: {
    message: 'hello vue'
  },
  beforeCreate () {
    console.log(this.$el) // undefined
    console.log('beforeCreate')
  },
  created () {
    console.log(this.$el) // undefined
    console.log('created')
  },
  beforeMount () {
    // 挂载到DOM前会触发
    console.log(this.$el) // DOM节点内容
    console.log('beforeMount')
  },
  render (h) {
    // console.log('render')
    return h('div', {}, this.message)
  },
  renderError (h, err) {
    return h('div', {}, err.stack)
  },
  mounted () {
    console.log(this.$el) // 已经渲染好的DOM节点内容
    console.log('mounted')
  },
  beforeUpdate () {
    // 数据变化时会触发
    console.log('beforeUpdate')
  },
  updated () {
    // 数据变化后会触发
    console.log('updated')
  },
  activated () {
    // 组件切换到启用状态时会触发
    console.log('activated')
  },
  deactivated () {
    // 组件切换出去时会触发
    console.log('deactivated')
  },
  beforeDestroy () {
    // 实例销毁前会触发
    console.log('beforeDestroy')
  },
  destroyed () {
    // 实例销毁后会触发
    console.log('destroyed')
  }
})

app.message = 'hello vue change'

setTimeout(() => {
  app.$destroy()
}, 2000)
