import {
  UI_ENABLE_SCROLL,
  UI_DISABLE_SCROLL,
  UI_OPEN_MODAL_GROUP_CREATE,
  UI_CLOSE_MODAL_GROUP_CREATE,
  UI_OPEN_MODAL_USER_CREATE,
  UI_CLOSE_MODAL_USER_CREATE
} from '../../mutation-types'

export default {
  [UI_ENABLE_SCROLL] (state) {
    state.canScroll = true
  },

  [UI_DISABLE_SCROLL] (state) {
    state.canScroll = false
  },

  [UI_OPEN_MODAL_GROUP_CREATE] (state) {
    state.shouldOpenModalGroupCreate = true
  },

  [UI_CLOSE_MODAL_GROUP_CREATE] (state) {
    state.shouldOpenModalGroupCreate = false
  },

  [UI_OPEN_MODAL_USER_CREATE] (state) {
    state.shouldOpenModalUserCreate = true
  },

  [UI_CLOSE_MODAL_USER_CREATE] (state) {
    state.shouldOpenModalUserCreate = false
  }
}
