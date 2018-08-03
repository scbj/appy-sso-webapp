import { make } from 'vuex-pathify'

import * as actions from './actions'

export const state = {
  articles: []
}

const mutations = make.mutations(state)

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
