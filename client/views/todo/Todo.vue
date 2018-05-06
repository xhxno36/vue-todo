<template>
  <div id="app">
      <div class="cover"></div>
      <todo-header></todo-header>
      <todo-body></todo-body>
      <todo-footer></todo-footer>
  </div>
</template>
<script>
import TodoHeader from './TodoHeader.vue'
import TodoBody from './TodoBody.vue'
import TodoFooter from './TodoFooter.vue'
export default {

  components: {
    TodoHeader,
    TodoBody,
    TodoFooter
  }
}
</script>

<style lang="stylus" scoped>
    @import "../assets/styles/mixin.styl";
    #app
    .cover
        position: absolute
        left: 0
        right: 0
        top: 0
        bottom: 0
    .cover
        background-color:#999
        opacity: .9
        z-index: -1
</style>
