<template>
  <div>
    this is login {{id}}
  </div>
</template>
<script>
export default {
  // 当前路由切换进来之前调用
  beforeRouteEnter (to, from, next) {
    // console.log('login before route enter')
    // 获取不到当前组件 this
    // console.log(this) 报undefined错误

    // 需要在next的回调函数里面去获取
    next(vm => {
      console.log('login before route enter', vm.id)
    })
  },
  // 当前路由参数变化时会调用 /path => /path/123
  beforeRouteUpdate (to, from, next) {
    console.log('login before route update')
    next()
  },
  // 当前路由切换离开之前执行
  beforeRouteLeave (to, from, next) {
    console.log('login before route leave')

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
  }
}
</script>
