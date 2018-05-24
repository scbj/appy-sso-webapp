import * as actions from './actions'
import mutations from './mutations'

export const state = {
  canScroll: true,
  shouldOpenModalGroupCreate: false,
  shouldOpenModalUserCreate: false
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
