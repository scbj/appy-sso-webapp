import { postAsync } from '@/http-common'

const base = 'api/v1/licence'

/**
 * @typedef {Object} ApiResponse
 * @property {Object} data The response data
 * @property {Number} status The status code of the response
 * @property {String} [message] The optional message
 * @property {Error} [error] The response error
 */

/**
 * Returns a status code 200 if the key is valid.
 * @method POST
 * @returns {Promise<ApiResponse>}
 */
export function validate (key) {
  return postAsync(base + '/validate', { key })
}

/**
 * Activate the specified licence and create first user.
 * @method POST
 * @returns {Promise<ApiResponse>}
 */
export function activate (data) {
  return postAsync(base + '/activate', data)
}
