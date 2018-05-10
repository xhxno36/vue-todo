import Vue from 'vue'

const Comp1 = {
  name: 'first',
  mounted () {
    console.log('Comp1 mounted invoked')
  },
  props: {
    content: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      num: 0
    }
  },
  template: `
    <div>
      <div>this is Comp1 content</div>
      <div>{{content}}</div>
      <input type="text" v-model="num">
    </div>
  `
}

const parent = new Vue({
  name: 'parent'
})

const Comp2 = {
  // 指定父级并不起作用 只在调用组件的地方指定父级 才会起作用
  // parent: parent,
  name: 'second',
  extends: Comp1,
  data () {
    return {
      num: 456
    }
  },
  mounted () {
    // 返回 top new vue
    console.log(this.$parent.$options.name)
    console.log('Comp2 mounted invoked')

    // 修改上层调用时的data数据 但是不建议修改 会导致混乱
    // this.$parent.content = 'content from top new vue is modify by Comp2 from inside mounted function'
  }
}

// const CompVue = Vue.extend(Comp1)

/* new CompVue({
  el: '#root',
  //不起作用
  // props: {
    // content: 'content from CompVue'
  //}
  propsData: {
    content: 'content from CompVue'
  },
  // 会覆盖掉Comp1的data里面的定义
  data: {
    num: 123
  },
  mounted () {
    console.log('CompVue mounted invoked')
  }
}) */
new Vue({
  parent: parent,
  name: 'top new vue',
  mounted () {
    console.log(this.$parent.$options.name)
  },
  el: '#root',
  components: {
    Comp2
  },
  data: {
    content: 'Comp2 content from new function'
  },
  template: `<comp2 :content='content'></comp2>`
})
