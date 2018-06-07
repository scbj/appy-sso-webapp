import { make } from 'vuex-pathify'

export const state = {
  opened: false,
  content: null
}

export const getters = {
  shouldBodyScrollable (state) {
    return !state.opened
  }
}

export const actions = {
  open ({ commit }, payload) {
    const component = payload && payload.component

    // The component must be loaded if specified
    if (component) {
      commit('SET_CONTENT', component)
    }
    commit('SET_OPENED', true)
  },

  close ({ commit }) {
    commit('SET_OPENED', false)
  }
}

export const mutations = make.mutations(state)

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
