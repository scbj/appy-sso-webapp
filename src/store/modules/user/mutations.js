import * as types from '../../mutation-types'

export default {
  [types.CHANGE_LANGUAGE] (state, payload) {
    state.language = payload.locale
  }
}
