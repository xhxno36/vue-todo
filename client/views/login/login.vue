<template>
  <form class="login-form">
    <h1>Login</h1>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="User Name" :value="username">
      <div class="error-msg" v-if="usernameError">{{usernameError}}</div>
    </div>
    <div class="form-group">
      <input type="password" class="form-control" placeholder="Password" v-model="password">
      <div class="error-msg" v-if="passwordError">{{passwordError}}</div>
    </div>
    <button class="btn btn-block btn-primary" type="submit" @click.prevent="checkLogin">登&emsp;&emsp;录</button>
  </form>
</template>
<script>
import { mapState } from 'vuex'
export default {
  // 在渲染该组件的对应路由被 confirm 前调用
  // 不！能！获取组件实例 `this`
  // 因为当守卫执行前，组件实例还没被创建
  // 当前路由切换进来之前调用
  beforeRouteEnter (to, from, next) {
    // console.log('login.vue before route enter')
    // 获取不到当前组件 this
    // console.log(this) 报undefined错误

    // 需要在next的回调函数里面去获取
    next(vm => {
      console.log('login.vue before route enter', vm.id)
    })
  },
  // 在当前路由改变，但是该组件被复用时调用
  // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  // 可以访问组件实例 `this`
  // 当前路由参数变化时会调用 /path => /path/123
  beforeRouteUpdate (to, from, next) {
    console.log('login.vue before route update')
    next()
  },
  // 导航离开该组件的对应路由时调用
  // 可以访问组件实例 `this`
  // 当前路由切换离开之前执行
  beforeRouteLeave (to, from, next) {
    console.log('login.vue before route leave')

    if (confirm('确认离开吗')) {
      next()
    }
  },
  props: {
    id: {
      type: String
    }
  },
  // 在路由更新 /path => /path/123 的时候 不会被调用
  mounted () {
    console.log('login mounted')
  },
  data () {
    return {
      username: '',
      usernameError: '',
      password: '',
      passwordError: ''
    }
  },
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,
    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',
    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.id
    }
  }),
  methods: {
    checkLogin () {
    }
  },
  watch: {
    username (newVal, oldVal) {
      this.usernamError = newVal === '' ? '请输入用户名' : ''
    },
    password (newVal, oldVal) {
      this.passwordError = newVal === '' ? '请输入密码' : ''
    }
  }
}
</script>
<style lang="stylus" scoped>
  .login-form
    width 350px
    display flex
    flex-direction column
    align-items flex-start
    background-color #fff
    padding 20px
    margin 0 auto
    h1
      color #3d3d3d
      font-weight 500
    .form-group
      width 100%
      margin-bottom 15px
    .form-control
      width 100%
      line-height 30px
      border 1px solid #aaa
      appearance none
      padding-left 10px
      padding-right 10px
      box-sizing border-box
    .btn
      appearance none
      background-color #e3e3e3e3
      color #000
      line-height 30px
      outline none
      border 0
      cursor pointer
      padding-top 5px
      padding-bottom 5px
      &:hover
        opacity .8
    .btn-block
      width 100%
    .btn-primary
      color #fff
      background-color #ff6600
    .error-msg
      color red
</style>
