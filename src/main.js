import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

// 导入全局通用css
import 'assets/css/global.css'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
