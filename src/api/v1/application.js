import { HTTP } from '../../http-common'

const base = 'api/v1/application'

export function list () {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await HTTP.get(base)
      if (!res.data) {
        throw new Error('data')
      }
      resolve(res.data)
    } catch (err) {
      reject(err)
    }
  })
}
