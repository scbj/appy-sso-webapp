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
