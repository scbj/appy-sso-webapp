import * as types from '@/store/mutation-types'
import { changeLocale as i18nChangeLocale, i18n } from '@/i18n'
import api from '@/api/v1/index'

export async function changeLanguage ({ commit, state, rootGetters }, payload) {
  if (!payload) return false

  i18nChangeLocale(payload.locale)

  // Send update to the server if the user is logged in
  const isLoggedIn = rootGetters['auth/isLoggedIn'] || false
  if (isLoggedIn) {
    const data = { language: payload.locale }
    const res = await api.user.update(state.id, data)
    if (res.status !== 201) {
      return
    }
  }

  // Mutate the state
  commit(types.CHANGE_LANGUAGE, payload)
}

export async function create (context, payload) {
  const response = await api.user.create(payload)
  return response.status === 200
}

export async function fetch ({ commit }) {
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

export async function search ({ commit }, payload) {
  const res = await api.user.search(payload)
  const data = res.data
  if (data) {
    commit(types.USER_LIST, {
      total: data.total,
      perPage: +data.per_page,
      currentPage: data.current_page,
      lastPage: data.last_page,
      users: data.data
    })
  }
}

export function cleanList ({ commit }) {
  commit(types.USER_CLEAN_LIST)
}

export async function remove (_, payload) {
  return api.user.remove(...payload.ids)
}
