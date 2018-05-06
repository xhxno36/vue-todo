import Vue from 'vue'
import App from './app.vue'

// import './assets/styles/global.css';
// import './assets/images/fg.jpg';
import 'assets/styles/global.styl'
const root = document.createElement('div')
document.body.appendChild(root)

new Vue({
  render: (h) => h(App)
}).$mount(root)
