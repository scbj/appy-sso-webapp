/**
 * Handle Internet Explorer weakness. 🤓
 */

import { detect } from 'detect-browser'

const browser = detect()
if (browser && browser.name === 'ie') {
  // Add support for promises
  window.Promise = require('bluebird')

  // Adds ResizeObserver support through a polyfill
  window.ResizeObserver = require('resize-observer-polyfill')
}
