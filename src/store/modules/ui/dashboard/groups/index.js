import { make } from 'vuex-pathify'

import * as actions from './actions'

// Modules
import users from './users'

export const state = {
  pending: false,
  activeGroupId: 0
}

export const getters = {
  activeGroup (state, getters, rootState) {
    if (getters.isDefaultGroupActive) return rootState.group.defaultGroup
    return rootState.group.all.find(group => group.id === state.activeGroupId)
  },

  isDefaultGroupActive (state, _, rootState) {
    const defaultGroup = rootState.group.defaultGroup
    return !!defaultGroup && defaultGroup.id === state.activeGroupId
  }
}

export const mutations = make.mutations(state)

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    users
  }
}
