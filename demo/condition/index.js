import Vue from 'vue'

new Vue({
  el: '#root',
  data: {
    seen: false,
    type: 'A',
    loginType: 'username'
  },
  methods: {
    toggleLoginType () {
      this.loginType = this.loginType === 'username' ? 'email' : 'username'
    }
  },
  template: `
    <div>
      <div v-if="seen">根据参数来判断是否显示DOM，参数改变则会操作DOM</div>
      <div v-else>v-else要紧跟着v-if或者v-else-if后面</div>

      <div v-if="type === 'A'">v-if type等于A</div>
      <div v-else-if="type === 'B'">v-else-if type等于B</div>
      <div v-else>v-else type不等于A也不等于B</div>

      <template v-if="!seen">
        <div>div：如果要切换多个元素，可使用template标签上绑定v-if进行分组</div>
        <p>p：如果要切换多个元素，可template标签上绑定v-if进行分组</p>
      </template>


      <!--使用key来管理可复用的元素 vue通常会复用已有元素而不是从头开始渲染-->
      <template v-if="loginType === 'username'">
        <label>Username</label>
        <input placeholder="Enter your username">
      </template>
      <template v-else>
        <label>Email</label>
        <input placeholder="Enter your email address">
      </template>


      <!--“这两个元素是完全独立的，不要复用它们”。只需添加一个具有唯一值的 key 使用key切换后会重新渲染-->
      <template v-if="loginType === 'username'">
        <label>Username</label>
        <input placeholder="Enter your username" key="username-input">
      </template>
      <template v-else>
        <label>Email</label>
        <input placeholder="Enter your email address" key="email-input">
      </template>



      <!--如果下面的label和input加上div包裹，复用就失效了-->
      <!--<template v-if="loginType === 'username'">
        <div><label>Username</label>
        <input placeholder="Enter your username"></div>
      </template>
      <template v-else>
        <div><label>Email</label>
        <input placeholder="Enter your email address"></div>
      </template>-->

      <button type="button" @click="toggleLoginType">切换登录类型</button>

      <div v-show="!seen">根据参数来判断是否显示DOM，参数改变只会切换DOM显示状态，不管参数的值，默认都是生成DOM结构</div>
    </div>

  `
})
