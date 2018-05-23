import { GROUP_LIST } from '../../mutation-types'

export default {
  [GROUP_LIST] (state, payload) {
    state.groups = payload.groups
  }
}
