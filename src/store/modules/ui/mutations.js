import {
  UI_ENABLE_SCROLL,
  UI_DISABLE_SCROLL
} from '../../mutation-types'

export default {
  [UI_ENABLE_SCROLL] (state) {
    state.canScroll = true
  },

  [UI_DISABLE_SCROLL] (state) {
    state.canScroll = false
  }
}
