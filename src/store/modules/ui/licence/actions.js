import api from '@/api/v1'

export function completeStep ({ state, commit }, payload) {
  const completedStepCount = state.completedStepCount
  const step = payload.step

  // Allow only incremental changes
  if (completedStepCount + 1 === step) {
    commit('SET_COMPLETED_STEP_COUNT', step)
  }
}

/** Validates a license key (whether the specified key exists or not) */
export function validate (_, payload) {
  return api.licence.validate(payload.key)
}

export function activate ({ state }, payload) {
  const data = {
    owner: payload,
    licenceKey: state.key,
    companyName: state.companyName
  }
  return api.licence.activate(data)
}

export function clean ({ commit }) {
  commit('SET_COMPLETED_STEP_COUNT', 0)
  commit('SET_KEY', '')
  commit('SET_COMPANY_NAME', '')
  commit('SET_OWNER', {})
}
