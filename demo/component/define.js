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
        width: '500px',
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

const CustomComponent = {
  props: {
    type: String
  },
  data () {
    return {
      value: 0,
      buttonTxt: '点击',
      style: {
        color: 'red'
      }
    }
  },
  methods: {
    handleClick () {
      alert('custom component clicked')
    }
  },
  /* template: `
    <div :style>
      <slot name="header"></slot>
      <slot></slot>
      <slot name="footer"></slot>
      <button @click="handleClick" type="button">{{buttonTxt}}</button>
    </div>
  ` */

  // render方法渲染上面的template模板
  render (createElement) {
    return createElement('div', {
      ref: 'content',
      style: this.style
    }, [
      this.$slots.header,
      this.$slots.default,
      this.$slots.footer,
      createElement('button', {
        type: 'button',
        on: {
          click: this.handleClick
        }
      }, this.buttonTxt)
    ])
  }
}

new Vue({
  el: '#root',
  components: {
    ScopeComponent,
    CustomComponent
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
  /* // 使用局部注册的组件
  template: `
    <div>
      <scope-component :name="name" :num="num"  @change="handleChange">
        <span slot="header">this is header</span>
        <div slot-scope="props">{{props.message}} {{name}}</div>
        <span slot="footer">this is footer</span>
      </scope-component>

      <custom-component>
          <div slot="header">this is custom header</div>
          this is custom content
          <div slot="footer">this is custom footer</div>
      </custom-component>
    </div>
  ` */
  render (createElement) {
    return createElement('div', {}, [
      createElement('scope-component', {
        props: {
          name: this.name,
          num: this.num
        },
        on: {
          change: this.handleChange
        },
        // 作用域插槽写法
        scopedSlots: {
          default: props => createElement('div', {}, [props.message, ' ', this.name])
        }
      }, [
        createElement('span', {
          slot: 'header'
        }, 'this is header from scope component render function'),
        createElement('div', {
          slot: 'footer'
        }, 'this is footer from scope component render function')
      ]),
      createElement('custom-component', {}, [
        createElement('div', {
          slot: 'header'
        }, 'this is custom header'),
        'this is custom content',
        createElement('div', {
          slot: 'footer'
        }, 'this is custom footer')
      ])

    ])
  }
  /* // 使用全局注册的组件
  template: '<component1/>' */
})
