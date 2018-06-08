import { make } from 'vuex-pathify'

export const state = {
  opened: false,
  content: null,
  /** If it's true the modal can be closed during a click outside of it  */
  easyCloseEnabled: true
}

export const getters = {
  shouldBodyScrollable (state) {
    return !state.opened
  }
}

export const actions = {
  open ({ commit }, payload) {
    const content = payload && payload.content

    // The component must be loaded if specified
    if (content) {
      commit('SET_CONTENT', content)
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
