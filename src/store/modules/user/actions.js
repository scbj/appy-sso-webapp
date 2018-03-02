import * as types from '@/store/mutation-types'
import { changeLocale as i18nChangeLocale, i18n } from '@/i18n/index'
import api from '@/api/v1/'

export async function changeLanguage ({ commit, state }, payload) {
  if (!payload) {
    return false
  }

  i18nChangeLocale(payload.locale)

  // send update to the server
  const res = await api.user.update(state.id, {
    language: payload.locale
  })
  if (res.status === 201) {
    commit(types.CHANGE_LANGUAGE, payload)
  }
}

export async function fetch ({ commit, dispatch }) {
  const res = await api.user.self()
  if (!res.data) {
    return false
  }

  const { language, ...user } = res.data

  // update the language of the interface
  if (language && language !== i18n.locale) {
    i18nChangeLocale(language)
  }

  if (user) {
    commit(types.USER_FETCH, {
      language,
      ...user
    })
  }
}
