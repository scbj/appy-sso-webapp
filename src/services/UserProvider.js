import api from '../api/v1/index'

/**
 * @typedef {Object} UserProviderOptions
 * @property {String[]} fields
 * @property {String} orderBy
 * @property {Number} pageSize
 */

export default class UserProvider {
  /** @param {UserProviderOptions} options */
  constructor (options) {
    this.fields = options.fields
    this.orderBy = options.orderBy
    this.pageSize = options.pageSize
  }

  list ({ page = 1 } = {}) {
    return api.user.list({
      page,
      fields: this.fields,
      orderBy: this.orderBy,
      pageSize: this.pageSize
    })
  }

  listFromGroup ({ page = 1, groupId } = {}) {
    return api.group.listUsers({
      page,
      groupId,
      fields: this.fields,
      orderBy: this.orderBy,
      pageSize: this.pageSize
    })
  }

  search ({ query, page = 1 }) {
    return api.user.search({
      query,
      page,
      fields: this.fields,
      orderBy: this.orderBy,
      pageSize: this.pageSize
    })
  }
}
