import * as actions from './actions'
import mutations from './mutations'

export const state = {
  completedStepCount: 0,
  maxStep: 3,
  currentStep: 0,
  key: '',
  companyName: '',
  owner: {
    name: '',
    email: ''
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
