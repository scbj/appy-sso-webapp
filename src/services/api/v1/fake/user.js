import { get, post, put, deleteAsync } from '@/http'

const baseUrl = 'api/v1/user'

/**
 * @typedef {Object} Response
 * @property {Object} data The response data
 * @property {Number} status The status code of the response
 * @property {String} [message] The optional message
 * @property {Error} [error] The response error
 */

/**
 * Returns the authenticated user infos.
 * @method GET
 * @returns {Promise<Response>}
 */
export function self () {
  return {
    status: 200,
    data: {
      'id': 37,
      'firstname': 'Jimmie',
      'lastname': 'McKenzie',
      'email': 'Jimmie.McKenzie@example.com',
      'pictureUrl': null,
      'companyId': 1,
      'groupId': 150,
      'language': 'fr',
      'createdAt': '2018-03-20 11:07:04',
      'updatedAt': '2018-08-07 15:31:14',
      'activated': true,
      'destroyed': false,
      'roleName': 'admin',
      'groupName': 'DigiSmart ⚡'
    }
  }
}

/**
 * Returns the specified user infos.
 * @method GET
 * @returns {Promise<Response>}
 */
export function fetch ({ id }) {
  return get(`${baseUrl}/${id}`)
}

/**
 * Creates multiple users from their email addresses and associate with a group.
 * @returns {Promise<Response>}
 */
export function create ({ emails, groupId }) {
  return {
    status: 201,
    data: {
      'users': [
        {
          'firstname': '',
          'lastname': '',
          'email': 'caasey.neistat@a.com',
          'companyId': 1,
          'groupId': 1,
          'language': 'fr',
          'activated': false,
          'updatedAt': '2018-08-06 10:29:15',
          'createdAt': '2018-08-06 10:29:15',
          'id': 520,
          'roleName': 'standard',
          'groupName': 'default'
        }
      ]
    }
  }
}

/**
 * Updates the user's profile with the specified data.
 * @param {Number} id The user id
 * @param {Object} data The properties to update
 * @method POST
 * @returns {Promise<Response>}
 */
export function update ({ id, ...data }) {
  return put(`${baseUrl}/${id}`, data)
}

/**
 * Returns the list of the users.
 * @method GET
 * @returns {Promise<ApiResponse>}
 */
export function list ({ fields, orderBy, pageSize, page }) {
  // const pagination = `paginate=${pageSize}&page=${page}`
  // const fieldList = fields.join(',')
  // const url = `${baseUrl}?fields=${fieldList}&orderBy=${orderBy},asc&${pagination}`
  // return get(url)
  const users = [
    {
      firstname: 'Foo',
      lastname: 'Dupont',
      email: 'thomas.dupont@example.com',
      roleName: 'standard'
    }
  ]
  return {
    status: 200,
    data: {
      total: users.length,
      currentPage: 1,
      data: [
        {
          'id': 1,
          'firstname': 'Tracer',
          'lastname': 'Hogoe',
          'email': 'simeon.hoeger@example.com',
          'companyId': 1,
          'groupId': 150,
          'language': 'fr',
          'createdAt': '2018-03-20 11:07:01',
          'updatedAt': '2018-08-21 12:50:37',
          'activated': true,
          'destroyed': false,
          'roleName': 'admin',
          'groupName': 'DigiSmart ⚡'
        },
        {
          'id': 2,
          'firstname': 'JR',
          'lastname': 'Bovo',
          'email': 'jean-regis.bovo@digi-smart.fr',
          'pictureUrl': null,
          'companyId': 1,
          'groupId': 1,
          'language': 'fr',
          'createdAt': '2018-03-20 11:07:01',
          'updatedAt': '2018-08-07 15:26:47',
          'activated': true,
          'destroyed': false,
          'roleName': 'standard',
          'groupName': 'default'
        },
        {
          'id': 13,
          'firstname': 'Orville',
          'lastname': 'Bartoletti',
          'email': 'orville.bartoletti@example.com',
          'companyId': 1,
          'groupId': 1,
          'language': 'fr',
          'createdAt': '2018-03-20 11:07:02',
          'updatedAt': '2018-08-08 10:28:15',
          'activated': true,
          'destroyed': false,
          'roleName': 'standard',
          'groupName': 'default'
        },
        {
          'id': 18,
          'firstname': 'Russ',
          'lastname': 'Cronin',
          'email': 'russ.cronin@example.com',
          'companyId': 1,
          'groupId': 154,
          'language': 'fr',
          'createdAt': '2018-03-20 11:07:02',
          'updatedAt': '2018-08-07 15:23:50',
          'activated': true,
          'destroyed': false,
          'roleName': 'standard',
          'groupName': 'Ethics Yatching 🚤'
        },
        {
          'id': 28,
          'firstname': 'Orville',
          'lastname': 'Treutel',
          'email': 'orville.treutel@example.com',
          'companyId': 1,
          'groupId': 1,
          'language': 'fr',
          'createdAt': '2018-03-20 11:07:03',
          'updatedAt': '2018-08-08 10:28:15',
          'activated': true,
          'destroyed': false,
          'roleName': 'standard',
          'groupName': 'default'
        },
        {
          'id': 30,
          'firstname': 'Jairo',
          'lastname': 'Ferry',
          'email': 'jairo.ferry@example.com',
          'companyId': 1,
          'groupId': 284,
          'language': 'fr',
          'createdAt': '2018-03-20 11:07:04',
          'updatedAt': '2018-08-16 09:21:08',
          'activated': true,
          'destroyed': false,
          'roleName': 'standard',
          'groupName': 'Другой язык'
        },
        {
          'id': 31,
          'firstname': 'Skye',
          'lastname': 'Runolfsson',
          'email': 'skye.runolfsson@example.com',
          'companyId': 1,
          'groupId': 154,
          'language': 'fr',
          'createdAt': '2018-03-20 11:07:04',
          'updatedAt': '2018-08-07 15:23:39',
          'activated': true,
          'destroyed': false,
          'roleName': 'standard',
          'groupName': 'Ethics Yatching 🚤'
        },
        {
          'id': 34,
          'firstname': 'Kareem',
          'lastname': 'Brakus',
          'email': 'kareem.brakus@example.com',
          'companyId': 1,
          'groupId': 156,
          'language': 'fr',
          'createdAt': '2018-03-20 11:07:04',
          'updatedAt': '2018-08-08 09:58:00',
          'activated': true,
          'destroyed': false,
          'roleName': 'standard',
          'groupName': 'Parmenion'
        },
        {
          'id': 35,
          'firstname': 'Kolby',
          'lastname': 'Leannon',
          'email': 'kolby.leannon@example.com',
          'companyId': 1,
          'groupId': 199,
          'language': 'fr',
          'createdAt': '2018-03-20 11:07:04',
          'updatedAt': '2018-08-16 09:12:55',
          'activated': true,
          'destroyed': false,
          'roleName': 'standard',
          'groupName': 'Airbus'
        },
        {
          'id': 40,
          'firstname': 'Kristofer',
          'lastname': 'Jaskolski',
          'email': 'kristofer.jaskolski@example.com',
          'companyId': 1,
          'groupId': 199,
          'language': 'fr',
          'createdAt': '2018-03-20 11:07:05',
          'updatedAt': '2018-08-16 09:12:55',
          'activated': true,
          'destroyed': false,
          'roleName': 'standard',
          'groupName': 'Airbus'
        }
      ]
    }
  }
}

export function search ({ query, fields, orderBy, pageSize, page }) {
  const pagination = `paginate=${pageSize}&page=${page}`
  const fieldList = fields.join(',')
  const url = `${baseUrl}/search?orderBy=${orderBy},asc&fields=${fieldList}&${pagination}`
  const data = {
    q: query
  }
  return get(url, data)
}

export function remove (...ids) {
  const query = ids.join(',')
  const url = `${baseUrl}/${query}`
  return deleteAsync(url)
}
