import { getAsync, postAsync } from '@/http-common'

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

const defaultFields = [
  'id',
  'firstname',
  'lastname',
  'email',
  'pictureUrl',
  'created_at',
  'updated_at'
]

/**
 * Return the list of the users in the specified group.
 * @method GET
 * @returns {Promise<ApiResponse>}
 */
export function listUsers ({
  groupId,
  page = 1,
  paginate = 8,
  fields = defaultFields
}) {
  const url = `${base}/${groupId}/user?fields=${fields.join(',')}&paginate=${paginate}&page=${page}`
  return getAsync(url)
}
