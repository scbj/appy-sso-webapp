import { CHANGE_LOCALE } from './mutation-types'

export default {
  [CHANGE_LOCALE] (state, locale) {
    state.locale = locale
  }
}
