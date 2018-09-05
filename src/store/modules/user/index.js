import { make } from 'vuex-pathify'
import * as actions from './actions'

export const state = {
  current: null
}

export const getters = {
  username (state) {
    if (!state.current) return ''
    const { firstname, lastname } = state.current
    return `${firstname} ${lastname}`.trim()
  },

  isAdmin (state) {
    return state.current && state.current.roleName === 'admin'
  },

  mustFillProfileInfos (state) {
    return state.current
      ? !state.current.firstname || !state.current.lastname
      : false
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
