import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import pathify from 'vuex-pathify'

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
    article: state.article,
    licence: state.licence
  })
})

export default new Vuex.Store({
  plugins: [
    vuexLocalStorage.plugin,
    pathify.plugin
  ],
  modules
})
