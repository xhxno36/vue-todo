import Vue from 'vue'

// 实现v-model 双向绑定功能
const BindComp = {
  // 如果不希望v-model使用value属性 则可以通过model来指定
  model: {
    prop: 'value1',
    event: 'change'
  },
  // v-model默认使用value
  props: ['value', 'value1'],
  /* template: `
    <div>
      <input type="text" @input="handleInput" :value="value"/>
    </div>
  `, */
  // 使用model来指定v-model要绑定的属性
  template: `
  <div>
    <input type="text" @input="handleInput" :value="value1"/>
  </div>
`,
  methods: {
    handleInput (e) {
      // 自定义方式实现v-model的做法
      // this.$emit('parentInput', e.target.value)

      // 如果使用v-model 这里需要改成input
      // this.$emit('input', e.target.value)

      // 如果model里面指定了触发事件 这里要改成对应的事件
      this.$emit('change', e.target.value)
    }
  }
}

new Vue({
  el: '#root',
  components: {
    BindComp
  },
  data () {
    return {
      parentValue: 123
    }
  },
  /*
  * 不使用v-model指令 改成自定义方法去处理 需要指定事件处理需要的函数 绑定的参数传入
  template: `
    <div>
    <bind-comp :value="parentValue" @parentInput="handleParentInput"/>
    {{parentValue}}</div>
  `, */
  // 如果使用v-model 则不需要使用自定义的方法去处理 默认是input 所以组件内部需要去触发input事件
  template: `
  <div>
    <bind-comp v-model="parentValue"/>
    {{parentValue}}</div>
  `
  /* ,
  methods: {
    handleInput (newVal) {
      this.parentValue = newVal
    }
  } */
})
