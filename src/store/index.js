import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import mutations from './mutations'
import * as actions from './actions'
import auth from './modules/auth'

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  strict: debug,
  plugins: [ vuexLocalStorage.plugin ],
  mutations,
  actions,
  modules: { auth }
})
