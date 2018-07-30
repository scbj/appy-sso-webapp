import { make } from 'vuex-pathify'

import * as actions from './actions'
import * as types from '../../mutation-types'

export const state = {
  token: '',
  refreshToken: '',
  pending: false
}

export const getters = {
  ...make.getters(state),

  isLoggedIn (state) {
    return !!state.token
  }
}

export const mutations = {
  ...make.mutations(state),

  [types.LOGIN_REQUEST] (state) {
    state.pending = true
  },

  [types.LOGIN_SUCCESS] (state, payload) {
    state.pending = false
    state.token = payload.token
    state.refreshToken = payload.refreshToken
  },

  [types.LOGIN_FAILURE] (state) {
    state.pending = false
  },

  [types.LOGOUT] (state) {
    state.token = null
    state.refreshToken = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
