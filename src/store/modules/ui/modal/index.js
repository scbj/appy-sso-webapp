import { make } from 'vuex-pathify'
import * as actions from './actions'

export const state = {
  opened: false,
  content: null,
  params: null,

  /** This function must be called once when the modal is closed. */
  onClosed: () => {},

  /** If it's true the modal can be closed during a click outside of it  */
  easyCloseEnabled: true
}

export const getters = {
  /** Determines whether the page should be frozen or not. */
  shouldBodyScrollable (state) {
    return !state.opened
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
