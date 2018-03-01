import * as types from '../../mutation-types'

export default {
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
