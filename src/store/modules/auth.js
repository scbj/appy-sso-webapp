import * as types from '../mutation-types'
import { HTTP, setAuthorizationHeader } from '@/http-common'

export const state = {
  token: null,
  pending: false
}

export const getters = {
  isLoggedIn (state) { return !!state.token }
}

export const actions = {
  login ({ commit }, credentials) {
    commit(types.LOGIN_REQUEST)
    return new Promise(async (resolve) => {
      const data = {
        ...credentials,
        grant_type: 'password',
        client_id: '1',
        client_secret: 'pegUI3n9Ow30nPCVadaz0SLPiYIhZzzwjiVnVUI9'
      }
      try {
        const res = await HTTP.post('oauth/token', data)
        const token = res.data.access_token
        if (!token) throw new Error()

        // set the Bearer Token HTTP Header
        setAuthorizationHeader(token)

        // commit and store the token
        commit(types.LOGIN_SUCCESS, { token })

        // resolve promise with a status
        resolve({ status: res.status })
      } catch (err) {
        // try to get the status and the reason
        const status = err.response && err.response.status
        const error = err.response && err.response.statusText
        commit(types.LOGIN_FAILURE)

        // resolve the promise with a status and an error
        resolve({
          status: status || null,
          error: error || err.message
        })
      }
    })
  },

  logout ({ commit }) {
    commit(types.LOGOUT)
  }
}

export const mutations = {
  [types.LOGIN_REQUEST] (state) {
    state.pending = true
  },
  [types.LOGIN_SUCCESS] (state, payload) {
    state.pending = false
    state.token = payload.token
  },
  [types.LOGIN_FAILURE] (state) {
    state.pending = false
  },
  [types.LOGOUT] (state) {
    state.token = null
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
