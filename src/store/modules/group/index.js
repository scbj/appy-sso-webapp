import { make } from 'vuex-pathify'

import * as actions from '@/store/modules/group/actions'
import { sortAlphabetically } from '@/utils/array'

export const state = {
  all: [],
  defaultGroup: null
}

export const getters = {
  current (state, _, rootState) {
    // We must have the user information
    const user = rootState.user.current
    if (!user) return null

    // Thanks to the identifier of his group we will be able to retrieve the corresponding group
    if (state.defaultGroup && user.groupId === state.defaultGroup.id) {
      return state.defaultGroup
    }
    const group = state.all.find(group => group.id === user.groupId)
    return group
  },

  sortedList (state) {
    return sortAlphabetically(state.all, 'name')
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
