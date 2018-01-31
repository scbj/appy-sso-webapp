import { detect } from 'detect-browser'

/**
 * Handle Internet Explorer weakness.
 */
export function handleIE () {
  const browser = detect()

  // require promise and special IE css
  if (browser) {
    if (browser.name === 'ie') {
      window.Promise = require('bluebird')
    }
  }
}
