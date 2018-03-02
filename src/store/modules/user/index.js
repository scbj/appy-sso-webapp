import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

export const state = {
  language: null,
  email: null,
  firstname: null,
  lastname: null,
  pictureUrl: null
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
