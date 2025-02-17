import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import VuexPathify from 'vuex-pathify'

import * as modules from './modules'

Vue.use(Vuex)

const localStoragePersist = new VuexPersist({
  key: 'appy',
  storage: window.localStorage,
  reducer: state => ({
    auth: {
      accessToken: state.auth.accessToken,
      refreshToken: state.auth.refreshToken
    },
    user: {
      current: state.user.current
    }
  })
})

export default new Vuex.Store({
  plugins: [
    localStoragePersist.plugin,
    VuexPathify.plugin
  ],
  modules
})
