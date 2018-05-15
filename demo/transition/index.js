import Vue from 'vue'
import './transition.css'

// 进入/离开&列表过渡
// https://cn.vuejs.org/v2/guide/transitions.html
new Vue({
  el: '#root',
  data: {
    show: true,
    style: {
      width: '100px',
      height: '100px',
      border: '1px solid red'
    }
  },
  template: `
    <div>
      <!--<img src="https://cn.vuejs.org/images/transition.png"/>-->
      <button type="button" @click="toggle">toggle</button>
      <transition name='slide'>
        <div v-if='show'>slide hello</div>
      </transition>

      <transition name='fade'>
        <div v-show='show'>fade hello</div>
      </transition>

      <transition name='diff-slide' mode="in-out">
        <div v-if='show'>可以设置不同的进入和离开动画，设置持续时间和动画函数 </div>
      </transition>

      <transition name='bounce'>
        <div v-if='show' :style="style">css bounce动画</div>
      </transition>

      <transition name='bounce' appear>
        <div v-if='show' :style="style">css bounce动画</div>
      </transition>

      <!--自定义过渡类名-->
      <!--优先级高于普通的类名-->
      <!--配合 Animate.css-->

      <transition name='bounce'
        enter-class="animated"
        enter-active-class="animated tada"
        enter-to-class="animated"
        leave-class="animated"
        leave-active-class="animated bounceOutRight"
        leave-to-class="animated"
        :duration="{enter:500, leave:1000}"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
        @enter-cancelled="enterCancelled"

        @before-leave="beforeLeave"
        @leave="leave"
        @after-leave="afterLeave"
        @leave-cancelled="leaveCancelled"
      >
        <div v-if='show'>css bounce动画</div>
      </transition>

    </div>
  `,
  methods: {
    toggle () {
      this.show = !this.show
    },
    beforeEnter (el) {
      console.log(el)
    },
    enter (el, done) {
      console.log('enter')
    },
    afterEnter () {
      console.log('afterEnter')
    },
    enterCancelled () {
      console.log('enterCancelled')
    },
    beforeLeave (el) {
      console.log(el)
    },
    leave (el, done) {
      console.log('leave')
    },
    afterLeave () {
      console.log('afterLeave')
    },
    leaveCancelled () {
      console.log('leaveCancelled')
    }
  }
})
