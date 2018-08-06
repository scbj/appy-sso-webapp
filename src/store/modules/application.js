import { make } from 'vuex-pathify'
import api from '@/api/v1'

export const state = {
  all: [],
  allAvailable: []
}

export const mutations = make.mutations(state)

export const actions = {
  async list ({ commit }) {
    const { status, data: apps } = await api.application.list()

    if (status === 200 && Array.isArray(apps)) {
      commit('SET_ALL', apps)
    }
  },

  async listAvailable ({ rootState, commit }) {
    const { groupId } = rootState.user.current
    const { status, data: applications } = await api.group.listApplications({
      groupId: groupId
    })

    if (status === 200 && Array.isArray(applications)) {
      commit('SET_ALL_AVAILABLE', applications)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
