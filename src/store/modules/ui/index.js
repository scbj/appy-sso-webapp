import * as actions from './actions'
import mutations from './mutations'

export const state = {
  canScroll: true,
  shouldOpenModal: false
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
