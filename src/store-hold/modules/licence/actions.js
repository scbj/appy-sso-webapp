import * as types from '@/store/mutation-types'
import api from '@/api/v1'

export function completeStep ({ state, commit }, payload) {
  const completedStepCount = state.completedStepCount
  const step = payload.step

  // Allow only incremental changes
  if (completedStepCount + 1 === step) {
    commit(types.LICENCE_COMPLETE_STEP)
  }
}

export function updateCurrentStep ({ state, commit }, payload) {
  if (typeof payload.step === 'number') {
    commit(types.LICENCE_UPDATE_CURRENT_STEP, payload)
  }
}

export function updateKey ({ commit }, payload) {
  if (payload.key) {
    commit(types.LICENCE_UPDATE_KEY, payload)
  }
}

export function updateCompanyName ({ commit }, payload) {
  if (payload.companyName) {
    commit(types.LICENCE_UPDATE_COMPANY_NAME, payload)
  }
}

export function updateOwner ({ commit }, payload) {
  if (payload.name && payload.email) {
    commit(types.LICENCE_UPDATE_OWNER, payload)
  }
}

export function validate ({ commit }, payload) {
  return api.licence.validate(payload && payload.key)
}

export function activate ({ state, commit }, owner) {
  const data = {
    owner,
    licenceKey: state.key,
    companyName: state.companyName
  }
  return api.licence.activate(data)
}

export function clean ({ commit }) {
  commit(types.LICENCE_CLEAN)
}
