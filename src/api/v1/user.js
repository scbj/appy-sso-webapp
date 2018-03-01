import { getAsync } from '../../http-common'

const base = 'api/v1/user/'

/**
 * @typedef {Object} ApiResponse
 * @property {Object} data The response data
 * @property {Number} status The status code of the response
 * @property {String} [message] The optional message
 * @property {Error} [error] The response error
 */

/**
 * Return the authenticated user infos.
 * @method GET
 * @returns {Promise<ApiResponse>}
 */
export function self () {
  return getAsync(`${base}me`)
}
