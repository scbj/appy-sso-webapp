import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

export const state = {
  language: null,
  email: null,
  firstname: null,
  lastname: null,
  pictureUrl: null,
  all: {
    total: 0,
    currentPage: 0,
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
