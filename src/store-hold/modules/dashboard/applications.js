import { make } from 'vuex-pathify'

import api from '@/api/v1/index'
import { sortAlphabetically } from '@/utils/array'

export const state = {
  pending: false,
  list: []
}

export const getters = {
  ...make.getters(state),

  sortedList (state) {
    return sortAlphabetically(state.list, 'name')
  }
}

export const mutations = make.mutations(state)

export const actions = {
  async list ({ commit, state }, payload) {
    commit('SET_PENDING', true)

    const { data: applications } = await api.group.listApplications(payload)
    if (!applications) {
      commit('SET_PENDING', false)
      return false
    }

    commit('SET_LIST', applications)

    commit('SET_PENDING', false)
  },

  async remove ({ commit }, payload) {
    commit('SET_PENDING', true)
    const { groupId, appIds } = payload
    const response = await api.group.removeApps(groupId, appIds)
    commit('SET_PENDING', false)
    return response.status === 200
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
