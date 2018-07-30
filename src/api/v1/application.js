import { getAsync } from '@/http-common'

const base = 'api/v1/application'

/**
 * @typedef {Object} ApiResponse
 * @property {Object} data The response data
 * @property {Number} status The status code of the response
 * @property {String} [message] The optional message
 * @property {Error} [error] The response error
 */

/**
 * Return the list of application.
 * @method GET
 * @returns {Promise<ApiResponse>}
 */

export function list () {
  return getAsync(base)
}
