import { get } from '@/http'

const baseUrl = 'api/v1/company'

/**
 * @typedef {Object} ApiResponse
 * @property {Object} data The response data
 * @property {Number} status The status code of the response
 * @property {String} [message] The optional message
 * @property {Error} [error] The response error
 */

/**
 * Return the company infos.
 * @method GET
 * @returns {Promise<ApiResponse>}
 */
export function fetch () {
  return get(baseUrl)
}
