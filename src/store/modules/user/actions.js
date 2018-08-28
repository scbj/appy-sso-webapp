import api from '@/services/api/v1'
import i18n from '@/i18n'

/** Retrieves the logged-in user information. */
export async function fetchSelf ({ commit }) {
  const { status, data: user } = await api.user.self()

  if (status !== 200) return

  const { language } = user
  if (language && language !== i18n.locale) {
    i18n.locale = language
  }

  commit('SET_CURRENT', user)
}

/** Update the specified data of the logged-in user. */
export async function updateSelf ({ commit, dispatch, state }, payload) {
  const id = state.current.id
  const user = await dispatch('update', { id, ...payload })
  if (user) {
    commit('SET_CURRENT', user)
  }
}

/** Updates the specified data of the specified user. */
export async function update ({ commit }, payload) {
  if (!payload) return

  const { status, data: user } = await api.user.update(payload)

  // If the update is successful then we must return the object representing the user
  return status === 200 ? user : null
}
