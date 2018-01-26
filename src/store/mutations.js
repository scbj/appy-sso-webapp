import { LOGIN } from './mutation-types'

export default {
  [LOGIN] (state, user) {
    state.user = user
  }
}
