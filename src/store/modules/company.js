import { make } from 'vuex-pathify'
import api from '@/services/api/v1'

export const state = {
  current: null
}

export const mutations = make.mutations(state)

export const actions = {
  async fetch ({ commit }) {
    const { status, data: company } = await api.company.fetch()

    if (status === 201 && company) {
      commit('SET_CURRENT', company)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
