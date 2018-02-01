import Vue from 'vue'
import VueMq from 'vue-mq'
import ElementUI from 'element-ui'
import './assets/scss/element-ui/index.scss'

import App from './App'
import router from './router'
import store from './store'
import config from './plugin.config'
import { i18n } from './internationalization'
import { handleIE } from './utils/ie.suck'

Vue.use(VueMq, config.vueMq)
Vue.use(ElementUI, config.elementUI)

// handle IE weakness... 🤓
handleIE()

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
