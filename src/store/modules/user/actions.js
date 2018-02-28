import * as types from '../../mutation-types'
import { changeLocale as i18nChangeLocale } from '@/i18n'

export function changeLanguage ({ commit, state }, payload) {
  i18nChangeLocale(payload.locale)
  commit(types.CHANGE_LANGUAGE, payload)
}
