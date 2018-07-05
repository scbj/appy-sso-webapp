import Vue from 'vue'
import VueMq from 'vue-mq'
import ElementUI from 'element-ui'
import ResizeObserver from 'resize-observer-polyfill'

import './assets/scss/element-ui/index.scss'
import App from './App'
import BaseComponents from './plugins/BaseComponents'
import router from './router'
import store from './store'
import config from './plugin.config'
import { i18n } from './i18n'
import { handleIE } from './utils/ie.suck'
import api from './api/v1'

function installResizeObserverPolyfill () {
  if (window.ResizeObserver) return
  window.ResizeObserver = ResizeObserver
}

function installVuePlugins () {
  Vue.use(VueMq, config.vueMq)
  Vue.use(ElementUI, config.elementUI)
  Vue.use(BaseComponents)
}

/** Add important JavaScript objects for future access from the Browser Console. */
function configureDevelopmentAccessibility () {
  if (process.env.NODE_ENV === 'development') {
    window.vue = vue
    window.store = store
    window.router = router
    window.api = api
  }
}

installResizeObserverPolyfill()
installVuePlugins()
configureDevelopmentAccessibility()

// handle IE weakness... 🤓
handleIE()

const vue = new Vue({
  i18n,
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
