import * as types from './mutation-types'
import { changeLocale as i18nChangeLocale } from '@/i18n'

export function changeLocale ({ commit, state }, locale) {
  i18nChangeLocale(locale)
  commit(types.CHANGE_LOCALE, locale)
}
