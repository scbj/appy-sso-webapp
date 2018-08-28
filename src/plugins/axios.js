import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const config = {
  baseURL: process.env.VUE_APP_API_URL || ''
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
}

export const _axios = axios.create(config)

_axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    let { data } = response
    if (typeof data !== 'string') {
      // Transform the snake_case into a camelCase
      data = camelcaseKeys(data, { deep: true })
    }
    return Object.assign(response, { data })
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

/**
 * Define the default Authorization header for all request.
 * @param {string} token The Bearer token
 */
export function setAuthorizationHeader (token) {
  if (token) {
    _axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}
