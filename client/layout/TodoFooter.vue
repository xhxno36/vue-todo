<template>
  <div id="footer">
      written by {{author}}
  </div>
</template>
<script>
export default {
  data () {
    return {
      author: 'xhx'
    }
  }
}
</script>

<style lang="stylus" scoped>
    @import "../assets/styles/footer.styl";
</style>
