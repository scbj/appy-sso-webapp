import { APPLICATION_LIST } from '../../mutation-types'

export default {
  [APPLICATION_LIST] (state, payload) {
    state.applications = payload.applications
  }
}
