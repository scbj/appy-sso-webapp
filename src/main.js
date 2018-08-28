import Vue from 'vue'
import './plugins/axios'
import './plugins/element'
import './plugins/global-components'
import './plugins/mq'
import './utils/ie.suck'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'

Vue.config.productionTip = false

// ⚠ Warning: the condition is very important because it is dangerous to make available these objects globally in production.
if (process.env.NODE_ENV === 'development') {
  window.vue = Vue
  window.store = store
  window.router = router
}

new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
