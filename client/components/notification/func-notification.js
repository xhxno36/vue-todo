import Notification from './notification.vue'

export default {
  extends: Notification,
  data () {
    return {
      verticalOffset: 0,
      autoClose: 3000
    }
  },
  computed: {
    style () {
      return {
        position: 'fixed',
        right: '20px',
        bottom: `${this.verticalOffset}px`
      }
    }
  },
  methods: {
    createTimer () {
      if (this.autoClose) {
        this.timer = setTimeout(() => {
          this.visible = false
        }, this.autoClose)
      }
    }
  },
  mounted () {
    this.createTimer()
  },
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
}
