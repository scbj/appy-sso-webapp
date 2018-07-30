import * as types from '@/store/mutation-types'
import { setAuthorizationHeader } from '@/http-common'
import api from '@/api/v1/'

export async function login ({ commit }, credentials) {
  commit(types.LOGIN_REQUEST)

  // call API login route
  const res = await api.auth.login(credentials)
  const token = res.data && res.data.access_token
  const refreshToken = res.data && res.data.refresh_token

  // we must have the token to validate the connection
  if (token && refreshToken) {
    commit(types.LOGIN_SUCCESS, { token, refreshToken })

    // set the Bearer Token HTTP Header
    setAuthorizationHeader(token)
  } else {
    commit(types.LOGIN_FAILURE)
  }
  return res
}

export function logout ({ commit }) {
  commit(types.LOGOUT)
}

export async function refreshAccessToken ({ commit, state }) {
  const { status, data } = await api.auth.refreshAccessToken({
    refreshToken: state.refreshToken
  })

  const success = status === 200
  const token = data && data.access_token
  const refreshToken = data && data.refresh_token

  if (success) {
    setAuthorizationHeader(token)
  }

  commit('SET_TOKEN', success ? token : '')
  commit('SET_REFRESH_TOKEN', success ? refreshToken : '')

  return success
}
