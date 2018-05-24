import * as types from '@/store/mutation-types'

/**
 * Defines whether or not the body is scrollable.
 * @param {Boolean} scroll
 */
function shouldBodyScrollable (scroll) {
  document.body.style.overflowY = scroll
    ? ''
    : 'hidden'
}

export function enableScroll ({ commit }) {
  shouldBodyScrollable(true)
  commit(types.UI_ENABLE_SCROLL)
}

export function disableScroll ({ commit }) {
  shouldBodyScrollable(false)
  commit(types.UI_DISABLE_SCROLL)
}

export function openModalGroupCreate ({ commit }) {
  commit(types.UI_OPEN_MODAL_GROUP_CREATE)
}

export function closeModalGroupCreate ({ commit }) {
  commit(types.UI_CLOSE_MODAL_GROUP_CREATE)
}

export function openModalUserCreate ({ commit }) {
  commit(types.UI_OPEN_MODAL_USER_CREATE)
}

export function closeModalUserCreate ({ commit }) {
  commit(types.UI_CLOSE_MODAL_USER_CREATE)
}
