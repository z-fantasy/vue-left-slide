import LeftSlide from './leftSlide.vue'

// LeftSlide.version = '1.0.1'
LeftSlide.install = function (Vue) {
  Vue.component(LeftSlide.name, LeftSlide)
}
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(LeftSlide)
}
export default LeftSlide
