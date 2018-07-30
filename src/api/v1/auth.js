import { postAsync } from '@/http-common'

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
 * @method POST
 * @returns {Promise<ApiResponse>}
 */
export function login ({ username, password }) {
  const data = {
    username,
    password,
    grant_type: 'password',
    client_id: '1',
    client_secret: 'KLJu9fBeBZDXKxZCan8Wyy4aODVsAaM28uiWdl56'
  }
  return postAsync('oauth/token', data)
}

/**
 * Refresh the token.
 * @method POST
 * @returns {Promise<ApiResponse>}
 */
export function refreshAccessToken ({ refreshToken }) {
  const data = {
    refresh_token: refreshToken,
    grant_type: 'refresh_token',
    client_id: '1',
    client_secret: 'KLJu9fBeBZDXKxZCan8Wyy4aODVsAaM28uiWdl56'
  }
  return postAsync('oauth/token', data)
}
