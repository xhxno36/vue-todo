<template>
  <form class="login-form">
    <h1>Login {{ stateNum }}</h1>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="User Name" :value="stateNum" @input="updateStateNumLocal">
      <div class="error-msg" v-if="usernameError">{{usernameError}}</div>
    </div>
    <div class="form-group">
      <input type="password" class="form-control" placeholder="Password" v-model="password">
      <div class="error-msg" v-if="passwordError">{{passwordError}}</div>
    </div>
    {{ getFullname }}
    <button class="btn btn-block btn-primary" type="submit" @click.prevent="checkLogin">登&emsp;&emsp;录</button>
    <div>{{ loginNum }}</div>
    <div>{{ fullName }}</div>
  </form>
</template>
<script>
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  // vue-meta插件读取这里设置的参数来设置页面的seo
  metaInfo: {
    title: 'vue todo login page',
    meta: [
      {name: 'keywords', content: 'vue, login page'},
      {name: 'description', content: 'this is vue todo app\'s login page'}
    ]
  },
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

    // 使用mutation
    /* let i = 0
    setInterval(() => {
      // this.$store.commit('UPDATE_STATE_NUM', {
      // num: i++,
      // num2: 2
      // })
      this.updateStateNum({
        num: i++,
        num2: 2
      })
    }, 1000) */

    // 使用action
    /* this.$store.dispatch('updateStateNumAsync', {
      num: 5,
      time: 5000
    }) */

    /* this.updateStateNumAsync({
      num: 6,
      time: 3000
    }) */

    // this['login/setLoginNumAsync']({num: 6, time: 3000})

    // this.setLoginNumAsyncGlobal()
  },
  data () {
    return {
      username: '',
      usernameError: '',
      password: '',
      passwordError: ''
    }
  },
  computed: {
    /* stateNum() {
      return this.$store.state.stateNum
    }, */
    ...mapState(['stateNum']),
    ...mapGetters({
      getFullname: 'fullName'
    }),
    /* ...mapState({
      loginNum: state => state.login.loginNum
    }), */
    ...mapState('login', ['loginNum']),
    // 去取store下面的login module 下面的fullName getters
    ...mapGetters('login', ['fullName'])
    /* fullName () {
      return this.$store.getters.fullName
    } */
  },
  methods: {
    checkLogin () {
    },
    // vuex关于表单的处理
    // https://vuex.vuejs.org/zh-cn/forms.html
    updateStateNumLocal (e) {
      this.updateStateNum({
        num: e.target.value
      })
    },
    ...mapMutations({
      updateStateNum: 'UPDATE_STATE_NUM'
    }),
    // ...mapActions(['updateStateNumAsync', 'login/setLoginNumAsync', 'setLoginNumAsyncGlobal'])
    ...mapActions(['updateStateNumAsync'])
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
