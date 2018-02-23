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
      token: state.auth.token
    },
    user: state.user
  })
})

export default new Vuex.Store({
  plugins: [ vuexLocalStorage.plugin ],
  modules
})
