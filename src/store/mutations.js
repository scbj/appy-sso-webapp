import {
  LOGIN,
  CHANGE_LOCALE
} from './mutation-types'

export default {
  [LOGIN] (state, user) {
    state.user = user
  },

  [CHANGE_LOCALE] (state, locale) {
    state.locale = locale
  }
}
