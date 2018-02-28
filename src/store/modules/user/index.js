import * as actions from './actions'
import mutations from './mutations'

export const state = {
  language: null,
  email: null,
  fistname: null,
  lastname: null,
  pictureUrl: null
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
