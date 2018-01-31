import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import router from './router'
import { i18n } from './internationalization'
import { handleIE } from './utils/ie.suck'

Vue.use(ElementUI, { size: 'small' })

// handle IE weakness... 🤓
handleIE()

/* eslint-disable no-new */
new Vue({
  i18n,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
