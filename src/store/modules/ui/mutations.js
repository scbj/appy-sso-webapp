import {
  UI_ENABLE_SCROLL,
  UI_DISABLE_SCROLL,
  UI_OPEN_MODAL,
  UI_CLOSE_MODAL
} from '../../mutation-types'

export default {
  [UI_ENABLE_SCROLL] (state) {
    state.canScroll = true
  },

  [UI_DISABLE_SCROLL] (state) {
    state.canScroll = false
  },

  [UI_OPEN_MODAL] (state) {
    state.shouldOpenModal = true
  },

  [UI_CLOSE_MODAL] (state) {
    state.shouldOpenModal = false
  }
}
