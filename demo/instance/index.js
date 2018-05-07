import Vue from 'vue'

const app = new Vue({
  el: '#root',
  /* props: {
    message: {
      type: String,
      required: true
    }
  }, */
  data: {
    message: 'hello vue',
    num: 0
  },
  template: '<div ref="instance">{{message}}，{{num}}<div slot="footer">footer slot</div></div>',
  /* watch: {
    num (newVal, oldVal) {
      console.log(newVal, oldVal)
    }
  } */
  methods: {
  }
})

// 所有属性皆可在vue的api文档里面找到 https://cn.vuejs.org/v2/api
// vue的实例属性 $data

app.message = 'hello vue from outside'
// 修改了数据 获取DOM内容的时候并不会马上就输出结果 有个异步更新DOM的过程
// 所以此时读取DOM的内容还是旧的 hello vue，0 ...
console.log(app.$el.textContent)

// DOM更新后 获取到重新渲染后的新内容
// 关于nextTick https://segmentfault.com/a/1190000012861862
app.$nextTick(() => {
  console.log(app.$el.textContent) // 输出 hello vue from outside，0 ...
})

/* console.log(app.message)
console.log(app.$data)
console.log(app.$options)
console.log(app.$options.data.num)
console.log(app.$slots)
console.log(app.$refs)
console.log(app.$root === app) // true
console.log(app.$children)

console.log(app.$isServer) // 判断实例是否运行于服务器 */

/* const unWatch = app.$watch('num', (newVal, oldVal) => {
  console.log(newVal, oldVal)
}) */

/* setInterval(() => {
  app.$data.num += 1
  // app.$set(app.$data, 'num', app.$data.num + 1)
  // app.$options.data.num += 1
}, 1000) */

/* setTimeout(() => {
  unWatch()
}, 2000) */

/* app.$on('test', () => {
  console.log('test event')
})

app.$emit('test') */
