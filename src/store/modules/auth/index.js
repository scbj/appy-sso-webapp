import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

export const state = {
  token: null,
  pending: false
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
