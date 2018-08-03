import { make } from 'vuex-pathify'

import * as actions from '@/store/modules/auth/actions'

export const state = {
  pending: false,
  accessToken: '',
  refreshToken: ''
}

export const getters = {
  isLoggedIn (state) {
    return !!state.accessToken
  }
}

export const mutations = make.mutations(state)

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
