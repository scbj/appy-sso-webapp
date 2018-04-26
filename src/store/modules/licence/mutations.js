import {
  LICENCE_COMPLETE_STEP,
  LICENCE_UPDATE_CURRENT_STEP,
  LICENCE_UPDATE_KEY,
  LICENCE_UPDATE_COMPANY_NAME,
  LICENCE_UPDATE_OWNER,
  LICENCE_CLEAN
} from '../../mutation-types'

export default {
  [LICENCE_COMPLETE_STEP] (state, payload) {
    state.completedStepCount = state.completedStepCount + 1
  },

  [LICENCE_UPDATE_CURRENT_STEP] (state, payload) {
    state.currentStep = payload.step
  },

  [LICENCE_UPDATE_KEY] (state, payload) {
    state.key = payload.key
  },

  [LICENCE_UPDATE_COMPANY_NAME] (state, payload) {
    state.companyName = payload.companyName
  },

  [LICENCE_UPDATE_OWNER] (state, payload) {
    state.owner.name = payload.name
    state.owner.email = payload.email
  },

  [LICENCE_CLEAN] (state) {
    state.completedStepCount = 0
    state.key = ''
    state.companyName = ''
    state.owner.name = ''
    state.owner.email = ''
  }
}
