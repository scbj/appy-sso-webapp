import { make } from 'vuex-pathify'

import * as actions from './actions'

export const state = {
  pending: true,
  all: [],
  currentPage: 1,
  selectedUsers: [],
  totalUserCount: 0
}

export const mutations = make.mutations(state)

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
