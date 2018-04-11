import {
  LICENCE_COMPLETE_STEP,
  LICENCE_UPDATE_KEY,
  LICENCE_UPDATE_COMPANY_NAME
} from '../../mutation-types'

export default {
  [LICENCE_COMPLETE_STEP] (state, payload) {
    state.completedStepCount = state.completedStepCount + 1
  },

  [LICENCE_UPDATE_KEY] (state, payload) {
    state.key = payload.key
  },

  [LICENCE_UPDATE_COMPANY_NAME] (state, payload) {
    state.companyName = payload.companyName
  }
}
