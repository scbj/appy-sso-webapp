import api from '@/api/v1'
import { setAuthorizationHeader } from '@/http-common'

export async function login ({ commit }, credentials) {
  commit('SET_PENDING', true)

  const res = await api.auth.login(credentials)
  handleOauthTokenResponse(commit, res)

  commit('SET_PENDING', false)

  return { status: res.status }
}

export async function logout ({ commit }) {
  // TODO: Supprimer les autres variables du LocalStorage
  commit('SET_ACCESS_TOKEN', '')
  commit('SET_REFRESH_TOKEN', '')
}

export async function refreshAccessToken ({ commit, state }) {
  const res = await api.auth.refreshAccessToken({
    refreshToken: state.refreshToken
  })
  handleOauthTokenResponse(commit, res)

  return { status: res.status }
}

function handleOauthTokenResponse (commit, { data, status }) {
  if (status === 200) {
    const { accessToken, refreshToken } = data
    setAuthorizationHeader(accessToken)
    commit('SET_ACCESS_TOKEN', accessToken)
    commit('SET_REFRESH_TOKEN', refreshToken)
  }
}
