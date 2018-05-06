<template>
    <!--<header class="main-header"><h1>JTodo</h1></header>-->
    <!--css module调用类名-->
    <header :class="$style.mainHeader"><h1>JTodo</h1></header>
</template>
<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>

<!--<style lang="stylus" scoped>
    .main-header
        text-align: center
        h1
            font-size: 100px
            color: rgba(175, 47, 47, .4)
            font-weight: 100
            margin: 20px
</style>-->
<style lang="stylus" module>
    .main-header
        text-align: center
        h1
            font-size: 100px
            color: rgba(175, 47, 47, .4)
            font-weight: 100
            margin: 20px
</style>
