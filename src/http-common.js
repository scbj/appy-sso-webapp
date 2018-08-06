import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'

// TODO: Refactoriser tout le code de ce fichier qui se répète

/**
 * Axios instance.
 */
export const HTTP = axios.create({
  baseURL: process.env.API_URL
})

// We must transform the data of the answers into camelcase.
// We can do that by intercepting all the response.
HTTP.interceptors.response.use(
  res => {
    let { data } = res
    if (typeof data !== 'string') {
      // Transform the snake_case into a camelCase
      data = camelcaseKeys(data, { deep: true })
    }
    return Object.assign(res, { data })
  },
  error => Promise.reject(error)
)

/**
 * Define the default Authorization header for all request.
 * @param {string} token The Bearer token
 */
export function setAuthorizationHeader (token) {
  if (token) {
    HTTP.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }
}

export function getAsync (url) {
  return new Promise(async resolve => {
    const response = {
      data: null,
      status: 0
      // [message],
      // [error]
    }
    try {
      const res = await HTTP.get(url)
      response.status = res.status
      if (!res.data) {
        response.message = `No data received from "${url}"`
      }
      response.data = res.data
    } catch (err) {
      if (err.response) {
        response.status = err.status
      }
      response.error = err
    }

    resolve(response)
  })
}

export function postAsync (url, data) {
  return new Promise(async resolve => {
    const response = {
      data: null,
      status: 0
      // [message],
      // [error]
    }
    try {
      const res = await HTTP.post(url, data)
      response.status = res.status
      if (!res.data) {
        response.message = `No data received from "${url}"`
      }
      response.data = res.data
    } catch (err) {
      if (err.response) {
        response.status = err.response.status
      }
      response.error = err
    }

    resolve(response)
  })
}

export function putAsync (url, data) {
  return new Promise(async resolve => {
    const response = {
      data: null,
      status: 0
      // [message],
      // [error]
    }
    try {
      const res = await HTTP.put(url, data)
      response.status = res.status
      if (!res.data) {
        response.message = `No data received from "${url}"`
      }
      response.data = res.data
    } catch (err) {
      if (err.response) {
        response.status = err.status
      }
      response.error = err
    }

    resolve(response)
  })
}

export function deleteAsync (url) {
  return new Promise(async resolve => {
    const response = {
      data: null,
      status: 0
      // [message],
      // [error]
    }
    try {
      const res = await HTTP.delete(url)
      response.status = res.status
      if (!res.data) {
        response.message = `No data received from "${url}"`
      }
      response.data = res.data
    } catch (err) {
      if (err.response) {
        response.status = err.status
      }
      response.error = err
    }

    resolve(response)
  })
}
