import Vue from 'vue'
import App from './App.vue'
import leftSlide from './lib/index.js'
Vue.use(leftSlide)
new Vue({
  el: '#app',
  render: h => h(App)
})
