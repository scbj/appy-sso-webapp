import types from './mutation-types'

export default {
  login ({ commit, state }, user) {
    commit(types.LOGIN, user)
  }
}
