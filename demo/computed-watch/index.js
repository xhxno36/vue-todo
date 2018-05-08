import Vue from 'vue'

const app = new Vue({
  el: '#root',
  template: `
    <div>
      <div><input type="text" v-model="num"/></div>
      <div>{{num}}</div>
      <div><input type="text" v-model="firstName"/></div>
      <div>{{fullName}}</div>
      <div>{{getFullName()}}</div>
    </div>
  `,
  data: {
    num: 0,
    firstName: 'shawn',
    lastName: 'jason',
    obj: {
      a: 'obj.a'
    }
  },
  computed: {
    /* fullName () {
      console.log('fullName')
      return this.firstName + ' ' + this.lastName
    } */
    fullName: {
      // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  },
  methods: {
    getFullName () {
      console.log('getFullName')
      return this.firstName + ' ' + this.lastName
    }
  },
  watch: {
    firstName (newVal, oldVal) {
      this.firstName = newVal
    },
    'obj.a': {
      handler () {
        console.log('handler')
      },
      deep: true,
      immediate: true
    }
  }
})

/* setInterval(() => {
  // 每次数据更新 getFullName都会去调用
  app.num += 1
}, 1000) */

app.obj.a = 'obj.a from outside'
