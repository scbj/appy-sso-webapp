import { make } from 'vuex-pathify'

export const state = {
  companyName: '',
  completedStepCount: 0,
  currentStep: 0,
  key: '',
  maxStep: 3,
  owner: {
    name: '',
    email: ''
  }
}

export const mutations = make.mutations(state)

export default {
  namespaced: true,
  state,
  mutations
}
