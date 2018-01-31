import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(VueI18n)
Vue.use(VueResource)
Vue.use(ElementUI, { size: 'small' })

// Vue.http.options.root = process.env.API_URL

// for more info (pluralization, date time localization..etc) refer
// to the doc (http://kazupon.github.io/vue-i18n/en/)
const i18n = new VueI18n({
  locale: 'fr',
  silentTranslationWarn: true,
  messages: {
    en: {
      alert: {
        username: 'Please enter your username',
        password: 'Please enter your password'
      }
    },
    fr: {
      alert: {
        username: 'Veuillez renseigner votre nom d\'utilisateur',
        password: 'Veuillez renseigner votre mot de passe'
      }
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
