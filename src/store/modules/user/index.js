import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

export const state = {
  language: '',
  email: '',
  firstname: '',
  lastname: '',
  pictureUrl: '',
  roleName: '',
  all: {
    total: 0,
    currentPage: 1,
    perPage: 8,
    lastPage: 0,
    list: []
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
