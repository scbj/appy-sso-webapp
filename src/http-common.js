import axios from 'axios'

/**
 * Axios instance.
 */
export const HTTP = axios.create({
  baseURL: process.env.API_URL
})

/**
 * Define the default Authorization header for all request.
 * @param {string} token The Bearer token
 */
export function setAuthorizationHeader (token) {
  // Alter defaults after instance has been created
  HTTP.defaults.headers.common['Authorization'] = `Bearer ${token}`
}
