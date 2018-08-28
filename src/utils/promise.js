/**
 * Returns a promise that will be resolved after the specified number of milliseconds elapsed.
 * @param {Number} milliseconds The number of milliseconds to wait
 * @returns {Promise}
 */
export function delay (milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}
