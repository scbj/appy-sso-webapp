import { make } from 'vuex-pathify'

export const state = {
  opened: false,
  content: null,
  /** If it's true the modal can be closed during a click outside of it  */
  easyCloseEnabled: true,
  onClosed: () => {}
}

export const getters = {
  shouldBodyScrollable (state) {
    return !state.opened
  }
}

export const actions = {
  open ({ commit }, payload) {
    const content = payload && payload.content
    const onClosed = payload && payload.onClosed

    // The component must be loaded if specified
    if (content) {
      commit('SET_CONTENT', content)
    }

    // This function must be called once when the modal is closed.
    if (onClosed) {
      commit('SET_ON_CLOSED', onClosed)
    }
    commit('SET_OPENED', true)
  },

  close ({ commit, state }) {
    if (typeof state.onClosed === 'function') {
      state.onClosed()
    }
    commit('SET_OPENED', false)
    commit('SET_ON_CLOSED', () => {})
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
