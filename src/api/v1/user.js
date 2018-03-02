import { getAsync, putAsync } from '../../http-common'

const base = 'api/v1/user/'

/**
 * @typedef {Object} Response
 * @property {Object} data The response data
 * @property {Number} status The status code of the response
 * @property {String} [message] The optional message
 * @property {Error} [error] The response error
 */

/**
 * Return the authenticated user infos.
 * @method GET
 * @returns {Promise<Response>}
 */
export function self () {
  return getAsync(`${base}me`)
}

/**
 * Update the user's profile with the specified data.
 * @param {Number} id The user id
 * @param {Object} data The properties to update
 * @method POST
 * @returns {Promise<Response>}
 */
export function update (id, data) {
  return putAsync(`${base}${id}`, data)
}
