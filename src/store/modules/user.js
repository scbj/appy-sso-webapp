import * as types from '../mutation-types'
import { changeLocale as i18nChangeLocale } from '@/i18n/index'

export const state = {
  language: null,
  email: null,
  fistname: null,
  lastname: null,
  pictureUrl: null
}

export const actions = {
  changeLanguage ({ commit, state }, payload) {
    i18nChangeLocale(payload.locale)
    commit(types.CHANGE_LANGUAGE, payload)
  }
}

export const mutations = {
  [types.CHANGE_LANGUAGE] (state, payload) {
    state.language = payload.locale
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
