<template>
  <div>
    this is login {{id}}
  </div>
</template>
<script>
export default {
  props: {
    id: {
      type: String
    }
  },
  /* watch: {
    '$route' (to, from) {
      console.log(to)
      console.log(from)
    }
  } */
  beforeRouteUpdate (to, from, next) {

  }
}
</script>
