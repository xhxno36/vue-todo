<template>
  <div id="app">
      <div class="cover"></div>
      <todo-header/>
      <!-- <todo-body></todo-body> -->
      <router-link to="/login">login</router-link>
      <router-link to="/login/id">login</router-link>
      <router-link to="/todo">todo</router-link>

      <router-link to="/todo/sub">todo sub</router-link>

      <keep-alive>
        <transition name="fade">
          <router-view/>
        </transition>
      </keep-alive>
      <todo-footer/>
  </div>
</template>
<script>
import TodoHeader from 'layout/TodoHeader.vue'
import TodoBody from 'views/todo/TodoBody.vue'
import TodoFooter from 'layout/TodoFooter.vue'
export default {
  components: {
    TodoHeader,
    TodoBody,
    TodoFooter
  }
}
</script>

<style lang="stylus" scoped>
    #app
    .cover
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;

    .cover
        background-color:#999;
        opacity: .9;
        z-index: -1;

</style>
