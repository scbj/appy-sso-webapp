import * as types from './mutation-types'
import { changeLocale } from '@/internationalization'

export default {
  login ({ commit, state }, user) {
    commit(types.LOGIN, user)
  },

  changeLocale ({ commit, state }, locale) {
    changeLocale(locale)
    commit(types.CHANGE_LOCALE, locale)
  }
}
