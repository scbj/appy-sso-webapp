import { state as defaultState } from './index'

export function open ({ commit }, payload) {
  const content = payload && payload.content
  const onClosed = payload && payload.onClosed

  // The component must be loaded if specified
  if (content) {
    commit('SET_CONTENT', content)
  }

  // This function must be called once when the modal is closed.
  if (typeof onClosed === 'function') {
    commit('SET_ON_CLOSED', onClosed)
  }

  commit('SET_OPENED', true)
}

export function close ({ commit, state }) {
  state.onClosed()
  commit('SET_OPENED', false)
  commit('SET_ON_CLOSED', defaultState.onClosed)
}
