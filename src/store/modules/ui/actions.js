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
