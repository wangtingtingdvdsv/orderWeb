import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'highlight.js/styles/tomorrow.css'
import './common/scss/element-variables.scss'
import highlight from 'highlight.js'

Vue.directive('highlight', (el) => {
  let codes = el.querySelectorAll('code');
  let pres = el.querySelectorAll('pre');
  codes.forEach((codes) => {
    highlight.highlightBlock(codes)
  })
  pres.forEach((pres) => {
    highlight.highlightBlock(pres)
  })
})
Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
