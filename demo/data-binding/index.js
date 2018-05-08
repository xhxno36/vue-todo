import Vue from 'vue'
new Vue({
  el: '#root',
  template: `
    <div>
      <div v-html="html"></div>
      <div>{{Math.floor('5.66')}}</div>
      <div>{{arr.join('@')}}</div>
      <div>{{obj}}</div>
      <div :class="[{active: isActive}, clsobj]"> :class="[{{active: isActive}, clsobj}]"</div>
      <div :style="[style1, style2]">{{message}}</div>
    </div>
  `,
  data: {
    html: '<span style="color:purple">purple</span>',
    arr: [1, 2, 3],
    isActive: true,
    message: 'hello vue',
    obj: {
      a: 'obj a'
    },
    clsobj: {
      'bg-red': true,
      'text-danger': true
    },
    style1: {
      color: 'red'
    },
    style2: {
      fontSize: '14px'
    }
  }
})
