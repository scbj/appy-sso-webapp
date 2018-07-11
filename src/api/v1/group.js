import {
  getAsync,
  postAsync,
  deleteAsync,
  putAsync
} from '@/http-common'

const base = 'api/v1/group'

/**
 * @typedef {Object} ApiResponse
 * @property {Object} data The response data
 * @property {Number} status The status code of the response
 * @property {String} [message] The optional message
 * @property {Error} [error] The response error
 */

/**
 * Return the list of groups.
 * @method GET
 * @returns {Promise<ApiResponse>}
 */
export function list () {
  return getAsync(base)
}

/**
  * Create a new group with the specified name.
  * @method POST
  * @returns {Promise<ApiResponse>}
  */
export function create (name) {
  return postAsync(base, { name })
}

/**
 * Adds users to the specified group.
 * @param {Number} groupId The id of the group to update
 * @param {Array<Number>} usersIds TThe user IDs to add to the group
 * @method POST
 * @returns {Promise<ApiResponse>}
 */
export function addUsers (groupId, usersIds) {
  const url = `${base}/${groupId}/user/${usersIds.join('+')}`
  return postAsync(url)
}

/**
 * Removes users to the specified group.
 * @param {Number} groupId The id of the group to update
 * @param {Array<Number>} usersIds TThe user IDs to remove from the group
 * @method POST
 * @returns {Promise<ApiResponse>}
 */
export function removeUsers (groupId, usersIds) {
  const url = `${base}/${groupId}/user/${usersIds.join('+')}`
  return deleteAsync(url)
}

/**
 * Return the list of the users in the specified group.
 * @method GET
 * @returns {Promise<ApiResponse>}
 */
export function listUsers ({ groupId, fields, orderBy, pageSize, page }) {
  const pagination = `paginate=${pageSize}&page=${page}`
  const fieldList = fields.join(',')
  const url = `${base}/${groupId}/user?fields=${fieldList}&orderBy=${orderBy},asc&${pagination}`
  return getAsync(url)
}

/**
 * Update the specified group with the specified data.
 * @method PUT
 * @returns {Promise<ApiResponse>}
 */
export function update ({ groupId, ...data }) {
  const url = `${base}/${groupId}`
  return putAsync(url, data)
}

/**
 * Delete the group corresponding with the specified id.
 * @method POST
 * @returns {Promise<ApiResponse>}
 */
export function remove ({ groupId }) {
  const url = `${base}/${groupId}`
  return deleteAsync(url)
}
