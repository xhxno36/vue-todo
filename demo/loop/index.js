import Vue from 'vue'

new Vue({
  el: '#root',
  data: {
    arr: ['apple', 'banana', 'grape'],
    person: {
      name: 'jason',
      sex: 'male',
      age: 25
    },
    tag: 'tag',
    nums: [1, 2, 3, 4, 5]
  },
  computed: {
    evenNums () {
      return this.nums.filter((item) => item % 2 === 0)
    }
  },
  methods: {
    opArr () {
      this.arr.push('watermelon')
    },
    changeArr () {
      this.$set(this.arr, 1, 'orange')
    },
    delArr (index) {
      this.arr.splice(index, 1)
    },
    sortArr () {
      this.arr.sort()
    },
    reverseArr () {
      this.arr.reverse()
    },
    addProp () {
      this.$set(this.person, 'weight', '80kg')
    },
    addProps () {
      this.person = Object.assign({}, this.person, {
        location: 'china',
        height: '180cm'
      })
    }
  },
  template: `
    <div>
      <!--需要提供key 来实现复用-->
      <ul>
        <li v-for="(item,index) in arr" :key='item'>{{tag}}：{{index}}：{{item}} <a href="javascript:;" @click="delArr(index)">删除</a></li>
      </ul>

      <button type="button" @click="opArr">增加</button>
      <button type="button" @click="changeArr">变更</button>
      <button type="button" @click="sortArr">排序</button>
      <button type="button" @click="reverseArr">升降序</button>



      <!--需要提供key 来实现复用-->
      <ul>
        <li v-for="(item, key, index) in person" :key="item">{{index}}：{{key}}：{{item}}</li>
      </ul>
      <button type="button" @click="addProp">增加单个属性</button>
      <button type="button" @click="addProps">增加</button>

      <!--和v-if使用 不推荐这种用法-->
      <!--<ul>
        <li v-for="item in nums" v-if="item % 2 === 0" :key="item">{{item}}</li>
      </ul>-->

      <!--应该使用computed或method 返回对应计算后的数组再循环-->
      <ul>
        <li v-for="item in evenNums" :key="item">{{item}}</li>
      </ul>

      <!--也可以循环一个数值 也可以使用template来循环一个DOM组合-->
      <ul>
        <template v-for="n in 5">
          <li>{{n}}</li>
          <li class="divider"></li>
        </template>
      </ul>



    </div>
  `
})
