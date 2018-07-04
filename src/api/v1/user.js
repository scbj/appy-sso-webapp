import { getAsync, putAsync, postAsync, deleteAsync } from '../../http-common'

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

export function list ({ fields, orderBy, pageSize, page }) {
  const pagination = `paginate=${pageSize}&page=${page}`
  const fieldList = fields.join(',')
  const url = `${base}?fields=${fieldList}&orderBy=${orderBy},asc&${pagination}`
  return getAsync(url)
}

export function search ({ query, fields, orderBy, pageSize, page }) {
  const pagination = `paginate=${pageSize}$page=${page}`
  const fieldList = fields.join(',')
  const url = `${base}/search/${query}?orderBy=${orderBy},asc&fields=${fieldList}&${pagination}`
  return getAsync(url)
}

export function remove (...ids) {
  const query = ids.join(',')
  const url = `${base}/${query}`
  return deleteAsync(url)
}
