import dashboard from './dashboard'
import licence from './licence'
import modal from './modal'

import i18n from '@/i18n'

export const actions = {
  changeLanguage ({ commit, dispatch, rootGetters }, payload) {
    if (!payload) return

    const { locale } = payload
    i18n.locale = locale

    // If the user is logged in then we must update their language preference
    const isLoggedIn = rootGetters['auth/isLoggedIn']
    if (isLoggedIn) {
      dispatch('user/updateSelf', { language: locale }, { root: true })
    }
  }
}

export default {
  namespaced: true,
  actions,
  modules: {
    dashboard,
    licence,
    modal
  }
}
