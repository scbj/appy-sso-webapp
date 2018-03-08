import * as actions from './actions'
import mutations from './mutations'

export const state = {
  articles: []
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
