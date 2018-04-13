import * as types from '@/store/mutation-types'

export function completeStep ({ state, commit }, payload) {
  const completedStepCount = state.completedStepCount
  const step = payload.step

  // Allow only incremental changes
  if (completedStepCount + 1 === step) {
    commit(types.LICENCE_COMPLETE_STEP)
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
