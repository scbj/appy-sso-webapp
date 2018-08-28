import { get, post, put, deleteAsync } from '@/http'

const baseUrl = 'api/v1/group'

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
  return get(baseUrl)
}

/**
 * Return the specified group.
 * @method GET
 * @returns {Promise<ApiResponse>}
 */
export function fetch ({ id }) {
  return get(`${baseUrl}/${id}`)
}

/**
  * Create a new group with the specified name.
  * @method POST
  * @returns {Promise<ApiResponse>}
  */
export function create ({ name }) {
  return post(baseUrl, { name })
}

/**
 * Adds users to the specified group.
 * @param {Number} groupId The id of the group to update
 * @param {Array<Number>} usersIds TThe user IDs to add to the group
 * @method POST
 * @returns {Promise<ApiResponse>}
 */
export function addUsers (groupId, usersIds) {
  const url = `${baseUrl}/${groupId}/user/${usersIds.join(',')}`
  return post(url)
}

/**
 * Removes users to the specified group.
 * @param {Number} groupId The id of the group to update
 * @param {Array<Number>} usersIds The user IDs to remove from the group
 * @method POST
 * @returns {Promise<ApiResponse>}
 */
export function removeUsers ({ groupId, userIds }) {
  const url = `${baseUrl}/${groupId}/user/${userIds.join(',')}`
  return deleteAsync(url)
}

/**
 * Adds applications to the specified group.
 * @param {Number} groupId The id of the group to update
 * @param {Array<Number>} appIds TThe application IDs to add to the group
 * @method POST
 * @returns {Promise<ApiResponse>}
 */
export function addApplications (groupId, appIds) {
  const url = `${baseUrl}/${groupId}/application/${appIds.join(',')}`
  return post(url)
}

/**
 * Removes applications to the specified group.
 * @param {Number} groupId The id of the group to update
 * @param {Array<Number>} usersIds The app IDs to remove from the group
 * @method POST
 * @returns {Promise<ApiResponse>}
 */
export function removeApps (groupId, appIds) {
  const url = `${baseUrl}/${groupId}/application/${appIds.join(',')}`
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
  const url = `${baseUrl}/${groupId}/user?fields=${fieldList}&orderBy=${orderBy},asc&${pagination}`
  return get(url)
}

/**
 * Return the list of the applications in the specified group.
 * @method GET
 * @returns {Promise<ApiResponse>}
 */
export function listApplications ({ groupId }) {
  const url = `${baseUrl}/${groupId}/application`
  return get(url)
}

/**
 * Update the specified group with the specified data.
 * @method PUT
 * @returns {Promise<ApiResponse>}
 */
export function update ({ groupId, ...data }) {
  const url = `${baseUrl}/${groupId}`
  return put(url, data)
}

/**
 * Delete the group corresponding with the specified id.
 * @method POST
 * @returns {Promise<ApiResponse>}
 */
export function remove ({ groupId }) {
  const url = `${baseUrl}/${groupId}`
  return deleteAsync(url)
}
