import * as actions from './actions'
import mutations from './mutations'

export const state = {
  applications: []
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
