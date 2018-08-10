export function open ({ commit }, payload) {
  // If the intention is not only to display the modal, then we must parse the payload
  if (payload) {
    const { content, params, onClosed } = payload

    if (content) { commit('SET_CONTENT', content) }
    if (params) { commit('SET_PARAMS', params) }
    if (typeof onClosed === 'function') { commit('SET_ON_CLOSED', onClosed) }
  }

  commit('SET_OPENED', true)
}

export function close ({ commit, state }) {
  state.onClosed()
  commit('SET_OPENED', false)
  commit('SET_ON_CLOSED', () => {})
}
