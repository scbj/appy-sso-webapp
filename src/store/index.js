import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

import * as modules from './modules'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage,
  reducer: state => ({
    auth: {
      token: state.auth.token,
      refreshToken: state.auth.refreshToken
    },
    user: state.user,
    application: state.application,
    article: state.article
  })
})

export default new Vuex.Store({
  plugins: [ vuexLocalStorage.plugin ],
  modules
})
