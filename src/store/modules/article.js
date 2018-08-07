import { make } from 'vuex-pathify'
import api from '@/api/v1'

export const state = {
  all: []
}

export const mutations = make.mutations(state)

export const actions = {
  async list ({ commit }) {
    const { status, data: articles } = await api.article.list()

    if (status === 200 && Array.isArray(articles)) {
      commit('SET_ALL', articles)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
