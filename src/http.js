import { _axios } from '@/plugins/axios'

/**
 * Creates a response object based on the result or error specified in parameter. In order to easily handle errors and retrieve the information we are interested in
 */
function createResponse ({ res, error }) {
  const response = {
    status: error ? error.status : res.status,
    data: res ? res.data : null
  }
  if (error) {
    response.error = error
  }
  return response
}

/**
 * Send a request with the specified method to the specified url.
 * @param {Object} options - The options object
 * @param {String} options.method
 * @param {String} options.url
 * @param {Object} [options.data]
 * @param {Object} [options.config]
 */
async function request ({ method, url, data, config }) {
  // The functions get and delete of axios doesn't take request data in second argument but a parameter object.
  const allowsData = ![ 'get', 'delete' ].includes(method)
  try {
    const func = _axios[method]
    const res = allowsData
      ? await func(url, data, config)
      : await func(url, config)
    return createResponse({ res })
  } catch (error) {
    return createResponse({ error })
  }
}

/**
 * Send a GET request to the specified url.
 * @param {String} url The destination url
 * @param {Object} [data] The data sent as parameter
 */
export function get (url, data) {
  return request({
    method: 'get',
    url,
    config: {
      params: data
    }
  })
}

/**
 * Send a POST request to the specified url.
 * @param {String} url The destination url
 * @param {Object} [data] The data sent as parameter
 */
export function post (url, data) {
  return request({
    method: 'post',
    url,
    data
  })
}

/**
 * Send a PUT request to the specified url.
 * @param {String} url The destination url
 * @param {Object} [data] The data sent as parameter
 */
export function put (url, data) {
  return request({
    method: 'put',
    url,
    data
  })
}

/**
 * Send a DELETE request to the specified url.
 * Due to a conflict with the "delete" keyword, the "async"
 * suffix has been added to the end of the method name.
 * @param {String} url The destination url
 * @param {Object} [data] The data sent as parameter
 */
export function deleteAsync (url, data) {
  return request({
    method: 'delete',
    url,
    config: {
      params: data
    }
  })
}
