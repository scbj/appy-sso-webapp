import { getAsync, putAsync, postAsync } from '../../http-common'

const base = 'api/v1/user'

/**
 * @typedef {Object} Response
 * @property {Object} data The response data
 * @property {Number} status The status code of the response
 * @property {String} [message] The optional message
 * @property {Error} [error] The response error
 */

/**
 * Returns the authenticated user infos.
 * @method GET
 * @returns {Promise<Response>}
 */
export function self () {
  return getAsync(`${base}/me`)
}

/**
 * Creates multiple users from their email addresses.
 * @param {Array<String>} emails
 * @returns {Promise<Response>}
 */
export function createMultiple (emails) {
  return postAsync(`${base}/multiple`, emails)
}

/**
 * Updates the user's profile with the specified data.
 * @param {Number} id The user id
 * @param {Object} data The properties to update
 * @method POST
 * @returns {Promise<Response>}
 */
export function update (id, data) {
  return putAsync(`${base}/${id}`, data)
}

/**
 * Returns the list of the users.
 * @method GET
 * @returns {Promise<ApiResponse>}
 */

export function list (page) {
  return getAsync(base + '?fields=id,firstname,lastname,email&orderBy=firstname,asc&paginate=8&page=' + page)
}

export function search ({ query, page }) {
  const url = `/search/${query}?fields=id,firstname,lastname,email&paginate=8&page=${page}`
  return getAsync(base + url)
}
