import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import HTTP from './http/axios'

Vue.prototype.$http = HTTP
Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(ElementUI)

// for more info (pluralization, date time localization..etc) refer
// to the doc (http://kazupon.github.io/vue-i18n/en/)
const i18n = new VueI18n({
  locale: 'en',
  messages: {
    en: {
    },
    fr: {
    }
  }
})

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
