<template>
    <section class="real-app">
        <input
            type="text"
            class="add-input"
            autofocus="autofocus"
            placeholder="接下来要做什么"
            @keyup.enter="addTodo"
        >
        <todo-body-item
            :todo="todo"
            v-for="todo in filteredTodos"
            :key="todo.id"
            @del="deleteTodo"
        />
        <todo-body-tabs
            :filter="filter"
            :todos="todos"
            @toggle="toggleFilter"
            @clearAllCompleted="clearAllCompleted"
        />

        <router-view/>
    </section>
</template>
<script>
import TodoBodyItem from './TodoBodyItem.vue'
import TodoBodyTabs from './TodoBodyTabs.vue'
let count = 0
export default {
  // 当前路由切换进来之前调用
  beforeRouteEnter (to, from, next) {
    // console.log('TodoBody.vue before route enter')
    // 获取不到当前组件 this
    // console.log(this) 报undefined错误

    // 需要在next的回调函数里面去获取
    next(vm => {
      console.log('TodoBody.vue before route enter', vm.filter)
    })
  },
  // 当前路由参数变化时会调用 /path => /path/123
  beforeRouteUpdate (to, from, next) {
    console.log('TodoBody.vue before route update')
    next()
  },
  // 当前路由切换离开之前执行
  beforeRouteLeave (to, from, next) {
    console.log('TodoBody.vue before route leave')

    if (confirm('确认离开吗')) {
      next()
    }
  },
  data () {
    return {
      filter: 'all',
      todos: []
    }
  },
  components: {
    TodoBodyItem,
    TodoBodyTabs
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }

      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: count++,
        content: e.target.value.trim(),
        completed: false
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    },
    toggleFilter (state) {
      this.filter = state
    }
  }
}
</script>
<style lang="stylus" scoped>
    @import "~assets/styles/mixin.styl";
    .real-app
        width: 600px
        margin: 0 auto
        box-shadow: 0 0 5px #666
    .add-input
        position: relative
        margin: 0
        width: 100%
        font-size: 24px
        font-family: inherit
        font-weight: inherit
        line-height: 1.4em
        outline: none
        color: inherit
        padding: 6px
        /*box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2)*/
        box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03)
        box-sizing: border-box
        -webkit-font-smoothing: antialiased
        padding: 16px 16px 16px 60px
        border: none
</style>
