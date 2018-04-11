import * as actions from './actions'
import mutations from './mutations'

export const state = {
  completedStepCount: 0,
  key: '',
  companyName: ''
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
