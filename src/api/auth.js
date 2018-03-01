import { postAsync } from '../http-common'

/**
 * @typedef {Object} ApiResponse
 * @property {Object} data The response data
 * @property {Number} status The status code of the response
 * @property {String} message The optional message
 * @property {Error} error The response error
 */

/**
 * Login the user.
 * @param {String} username The username of the user
 * @param {String} password The password of the user
 * @method GET
 * @returns {Promise<ApiResponse>}
 */
export function login ({ username, password }) {
  const data = {
    username,
    password,
    grant_type: 'password',
    client_id: '1',
    client_secret: 'pegUI3n9Ow30nPCVadaz0SLPiYIhZzzwjiVnVUI9'
  }
  return postAsync('oauth/token', data)
}
