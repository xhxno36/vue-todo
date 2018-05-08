import Vue from 'vue'

// 全局注册组件
Vue.component('Component1', {
  template: '<div>component1 content</div>'
})

const ScopeComponent = {
  props: {
    name: {
      type: String,
      required: true,
      // 一般和required不同时出现
      default: 'scope'
    },
    type: {
      validator (val) {
        return val === Boolean
      }
    },
    num: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      value: 0,
      message: 'hello from scope component',
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #ccc'
      }
    }
  },
  methods: {
    handleInput (e) {
      this.$emit('change', e.target.value)
    }
  },
  template: `
    <div :style="style">
      <slot name="header"></slot>
      <div>scope component content</div>
      <slot :message="message"></slot>
      <slot name="footer"></slot>
      <input type="text" @input="handleInput" :value="num"/>
    </div>
  `
}

new Vue({
  el: '#root',
  components: {
    ScopeComponent
  },
  data: {
    name: 'root',
    num: 123
  },
  methods: {
    handleChange (newVal) {
      console.log(newVal)
    }
  },
  // 使用局部注册的组件
  template: `
    <div>
      <scope-component :name="name" :num="num"  @change="handleChange">
        <span slot="header">this is header</span>
        <div slot-scope="props">{{props.message}} {{name}}</div>
        <span slot="footer">this is footer</span>
      </scope-component>
    </div>
  `
  /* // 使用全局注册的组件
  template: '<component1/>' */
})
