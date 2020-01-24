import { get, post, put, deleteAsync } from '@/http'

const baseUrl = 'api/v1/group'

/**
 * @typedef {Object} ApiResponse
 * @property {Object} data The response data
 * @property {Number} status The status code of the response
 * @property {String} [message] The optional message
 * @property {Error} [error] The response error
 */

/**
 * Return the list of groups.
 * @method GET
 * @returns {Promise<ApiResponse>}
 */
export function list () {
  return get(baseUrl)
}

/**
 * Return the specified group.
 * @method GET
 * @returns {Promise<ApiResponse>}
 */
export function fetch ({ id }) {
  return get(`${baseUrl}/${id}`)
}

/**
  * Create a new group with the specified name.
  * @method POST
  * @returns {Promise<ApiResponse>}
  */
export function create ({ name }) {
  return post(baseUrl, { name })
}

/**
 * Adds users to the specified group.
 * @param {Number} groupId The id of the group to update
 * @param {Array<Number>} usersIds TThe user IDs to add to the group
 * @method POST
 * @returns {Promise<ApiResponse>}
 */
export function addUsers (groupId, usersIds) {
  const url = `${baseUrl}/${groupId}/user/${usersIds.join(',')}`
  return post(url)
}

/**
 * Removes users to the specified group.
 * @param {Number} groupId The id of the group to update
 * @param {Array<Number>} usersIds The user IDs to remove from the group
 * @method POST
 * @returns {Promise<ApiResponse>}
 */
export function removeUsers ({ groupId, userIds }) {
  const url = `${baseUrl}/${groupId}/user/${userIds.join(',')}`
  return deleteAsync(url)
}

/**
 * Adds applications to the specified group.
 * @param {Number} groupId The id of the group to update
 * @param {Array<Number>} appIds TThe application IDs to add to the group
 * @method POST
 * @returns {Promise<ApiResponse>}
 */
export function addApplications (groupId, appIds) {
  const url = `${baseUrl}/${groupId}/application/${appIds.join(',')}`
  return post(url)
}

/**
 * Removes applications to the specified group.
 * @param {Number} groupId The id of the group to update
 * @param {Array<Number>} usersIds The app IDs to remove from the group
 * @method POST
 * @returns {Promise<ApiResponse>}
 */
export function removeApps (groupId, appIds) {
  const url = `${baseUrl}/${groupId}/application/${appIds.join(',')}`
  return deleteAsync(url)
}

/**
 * Return the list of the users in the specified group.
 * @method GET
 * @returns {Promise<ApiResponse>}
 */
export function listUsers ({ groupId, fields, orderBy, pageSize, page }) {
  return {
    status: 200,
    data: {
      total: 2,
      page: 1,
      users: [
        {
          'id': 1,
          'firstname': 'Tracer',
          'lastname': 'Hogoe',
          'email': 'simeon.hoeger@example.com',
          'picture_url': 'http://192.168.1.98/THOMAS/sso_appy/public/uploads/appy/user/pictureTest.jpg',
          'company_id': 1,
          'group_id': 150,
          'language': 'fr',
          'created_at': '2018-03-20 11:07:01',
          'updated_at': '2018-08-21 12:50:37',
          'activated': true,
          'destroyed': false,
          'role_name': 'admin',
          'group_name': 'DigiSmart ⚡'
        },
        {
          'id': 2,
          'firstname': 'JR',
          'lastname': 'Bovo',
          'email': 'jean-regis.bovo@digi-smart.fr',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-03-20 11:07:01',
          'updated_at': '2018-08-07 15:26:47',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 13,
          'firstname': 'Orville',
          'lastname': 'Bartoletti',
          'email': 'orville.bartoletti@example.com',
          'picture_url': 'http://192.168.1.98/THOMAS/sso_appy/public/uploads/appy/user/3.jpg',
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-03-20 11:07:02',
          'updated_at': '2018-08-08 10:28:15',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 18,
          'firstname': 'Russ',
          'lastname': 'Cronin',
          'email': 'russ.cronin@example.com',
          'picture_url': 'http://192.168.1.98/THOMAS/sso_appy/public/uploads/appy/user/5.jpg',
          'company_id': 1,
          'group_id': 154,
          'language': 'fr',
          'created_at': '2018-03-20 11:07:02',
          'updated_at': '2018-08-07 15:23:50',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'Ethics Yatching 🚤'
        },
        {
          'id': 28,
          'firstname': 'Orville',
          'lastname': 'Treutel',
          'email': 'orville.treutel@example.com',
          'picture_url': 'http://192.168.1.98/THOMAS/sso_appy/public/uploads/appy/user/9.jpg',
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-03-20 11:07:03',
          'updated_at': '2018-08-08 10:28:15',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 30,
          'firstname': 'Jairo',
          'lastname': 'Ferry',
          'email': 'jairo.ferry@example.com',
          'picture_url': 'http://192.168.1.98/THOMAS/sso_appy/public/uploads/appy/user/10.jpg',
          'company_id': 1,
          'group_id': 284,
          'language': 'fr',
          'created_at': '2018-03-20 11:07:04',
          'updated_at': '2018-08-16 09:21:08',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'Другой язык'
        },
        {
          'id': 31,
          'firstname': 'Skye',
          'lastname': 'Runolfsson',
          'email': 'skye.runolfsson@example.com',
          'picture_url': 'http://192.168.1.98/THOMAS/sso_appy/public/uploads/appy/user/11.jpg',
          'company_id': 1,
          'group_id': 154,
          'language': 'fr',
          'created_at': '2018-03-20 11:07:04',
          'updated_at': '2018-08-07 15:23:39',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'Ethics Yatching 🚤'
        },
        {
          'id': 34,
          'firstname': 'Kareem',
          'lastname': 'Brakus',
          'email': 'kareem.brakus@example.com',
          'picture_url': 'http://192.168.1.98/THOMAS/sso_appy/public/uploads/appy/user/13.jpg',
          'company_id': 1,
          'group_id': 156,
          'language': 'fr',
          'created_at': '2018-03-20 11:07:04',
          'updated_at': '2018-08-08 09:58:00',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'Parmenion'
        },
        {
          'id': 35,
          'firstname': 'Kolby',
          'lastname': 'Leannon',
          'email': 'kolby.leannon@example.com',
          'picture_url': 'http://192.168.1.98/THOMAS/sso_appy/public/uploads/appy/user/14.jpg',
          'company_id': 1,
          'group_id': 199,
          'language': 'fr',
          'created_at': '2018-03-20 11:07:04',
          'updated_at': '2018-08-16 09:12:55',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'Airbus'
        },
        {
          'id': 40,
          'firstname': 'Kristofer',
          'lastname': 'Jaskolski',
          'email': 'kristofer.jaskolski@example.com',
          'picture_url': 'http://192.168.1.98/THOMAS/sso_appy/public/uploads/appy/user/17.jpg',
          'company_id': 1,
          'group_id': 199,
          'language': 'fr',
          'created_at': '2018-03-20 11:07:05',
          'updated_at': '2018-08-16 09:12:55',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'Airbus'
        },
        {
          'id': 41,
          'firstname': 'Lexus',
          'lastname': 'Wintheiser',
          'email': 'lexus.wintheiser@example.com',
          'picture_url': 'http://192.168.1.98/THOMAS/sso_appy/public/uploads/appy/user/18.jpg',
          'company_id': 1,
          'group_id': 199,
          'language': 'fr',
          'created_at': '2018-03-20 11:07:05',
          'updated_at': '2018-08-07 15:24:19',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'Airbus'
        },
        {
          'id': 539,
          'firstname': 'a a a a a a a a a',
          'lastname': '',
          'email': 'tititagtaf2@zafees.fr',
          'picture_url': null,
          'company_id': 1,
          'group_id': 199,
          'language': 'fr',
          'created_at': '2018-08-08 08:16:26',
          'updated_at': '2018-08-16 09:12:38',
          'activated': false,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'Airbus'
        },
        {
          'id': 540,
          'firstname': '',
          'lastname': '',
          'email': 'toto2@tutu.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 199,
          'language': 'fr',
          'created_at': '2018-08-08 08:16:27',
          'updated_at': '2018-08-16 09:12:38',
          'activated': false,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'Airbus'
        },
        {
          'id': 1421,
          'firstname': 'Yann',
          'lastname': 'Raffin',
          'email': 'yann.raffin@digi-smart.fr',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 13:29:55',
          'updated_at': '2018-08-10 13:31:01',
          'activated': false,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1422,
          'firstname': 'Hester',
          'lastname': 'Koelpin',
          'email': 'hester.koelpin@example.com',
          'picture_url': 'http://192.168.1.98/THOMAS/sso_appy/public/uploads/appy/user/19.jpg',
          'company_id': 1,
          'group_id': 284,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:51',
          'updated_at': '2018-08-16 09:20:59',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'Другой язык'
        },
        {
          'id': 1423,
          'firstname': 'Zane',
          'lastname': "D'Amore",
          'email': "zane.d'amore@example.com",
          'picture_url': 'http://192.168.1.98/THOMAS/sso_appy/public/uploads/appy/user/20.jpg',
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:51',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1424,
          'firstname': 'Aaron',
          'lastname': 'Collins',
          'email': 'aaron.collins@example.com',
          'picture_url': 'http://192.168.1.98/THOMAS/sso_appy/public/uploads/appy/user/21.jpg',
          'company_id': 1,
          'group_id': 150,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:51',
          'updated_at': '2018-08-16 09:12:07',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'DigiSmart ⚡'
        },
        {
          'id': 1425,
          'firstname': 'Conner',
          'lastname': 'Hammes',
          'email': 'conner.hammes@example.com',
          'picture_url': 'http://192.168.1.98/THOMAS/sso_appy/public/uploads/appy/user/22.jpg',
          'company_id': 1,
          'group_id': 199,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:51',
          'updated_at': '2018-08-16 09:12:38',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'Airbus'
        },
        {
          'id': 1426,
          'firstname': 'Ward',
          'lastname': 'Deckow',
          'email': 'ward.deckow@example.com',
          'picture_url': 'http://192.168.1.98/THOMAS/sso_appy/public/uploads/appy/user/23.jpg',
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:51',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1427,
          'firstname': 'Modesto',
          'lastname': 'Steuber',
          'email': 'modesto.steuber@example.com',
          'picture_url': 'http://192.168.1.98/THOMAS/sso_appy/public/uploads/appy/user/24.jpg',
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:51',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1428,
          'firstname': 'Brody',
          'lastname': 'Kunde',
          'email': 'brody.kunde@example.com',
          'picture_url': 'http://192.168.1.98/THOMAS/sso_appy/public/uploads/appy/user/25.jpg',
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:52',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1429,
          'firstname': 'Karl',
          'lastname': 'Weimann',
          'email': 'karl.weimann@example.com',
          'picture_url': 'http://192.168.1.98/THOMAS/sso_appy/public/uploads/appy/user/26.jpg',
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:52',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1430,
          'firstname': 'Geovany',
          'lastname': 'Lind',
          'email': 'geovany.lind@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:52',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1431,
          'firstname': 'Carroll',
          'lastname': "O'Keefe",
          'email': "carroll.o'keefe@example.com",
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:52',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1432,
          'firstname': 'Marshall',
          'lastname': 'Wyman',
          'email': 'marshall.wyman@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:52',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1433,
          'firstname': 'Christop',
          'lastname': 'Langworth',
          'email': 'christop.langworth@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:52',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1435,
          'firstname': 'Eldon',
          'lastname': 'Runolfsson',
          'email': 'eldon.runolfsson@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:52',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1436,
          'firstname': 'Turner',
          'lastname': 'Gibson',
          'email': 'turner.gibson@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:52',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1437,
          'firstname': 'Mike',
          'lastname': 'Tillman',
          'email': 'mike.tillman@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:52',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1439,
          'firstname': 'Darrion',
          'lastname': 'Robel',
          'email': 'darrion.robel@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 199,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:53',
          'updated_at': '2018-08-16 09:12:38',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'Airbus'
        },
        {
          'id': 1440,
          'firstname': 'Landen',
          'lastname': 'Kassulke',
          'email': 'landen.kassulke@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:53',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1442,
          'firstname': 'Zakary',
          'lastname': 'Parisian',
          'email': 'zakary.parisian@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:53',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1443,
          'firstname': 'Lonny',
          'lastname': 'Murphy',
          'email': 'lonny.murphy@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:53',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1444,
          'firstname': 'Ryann',
          'lastname': 'Cummerata',
          'email': 'ryann.cummerata@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:53',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1446,
          'firstname': 'Allen',
          'lastname': 'Brown',
          'email': 'allen.brown@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 199,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:53',
          'updated_at': '2018-08-16 09:12:38',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'Airbus'
        },
        {
          'id': 1447,
          'firstname': 'Elbert',
          'lastname': 'Runte',
          'email': 'elbert.runte@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:53',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1448,
          'firstname': 'Roberto',
          'lastname': 'Zemlak',
          'email': 'roberto.zemlak@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:53',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1449,
          'firstname': 'Donny',
          'lastname': 'Little',
          'email': 'donny.little@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:53',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1450,
          'firstname': 'Rollin',
          'lastname': 'Goldner',
          'email': 'rollin.goldner@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:54',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1451,
          'firstname': 'Hans',
          'lastname': 'Predovic',
          'email': 'hans.predovic@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:54',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1452,
          'firstname': 'Chance',
          'lastname': 'Leffler',
          'email': 'chance.leffler@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:54',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1453,
          'firstname': 'Jeffrey',
          'lastname': 'Cummings',
          'email': 'jeffrey.cummings@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:54',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1454,
          'firstname': 'Wellington',
          'lastname': 'Hudson',
          'email': 'wellington.hudson@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:54',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1455,
          'firstname': 'Jason',
          'lastname': 'Langworth',
          'email': 'jason.langworth@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 284,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:54',
          'updated_at': '2018-08-16 09:21:08',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'Другой язык'
        },
        {
          'id': 1456,
          'firstname': 'Valentin',
          'lastname': 'Hills',
          'email': 'valentin.hills@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 150,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:54',
          'updated_at': '2018-08-16 09:12:17',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'DigiSmart ⚡'
        },
        {
          'id': 1457,
          'firstname': 'Casimer',
          'lastname': 'Wolf',
          'email': 'casimer.wolf@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:54',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1458,
          'firstname': 'Diamond',
          'lastname': 'Kreiger',
          'email': 'diamond.kreiger@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 199,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:54',
          'updated_at': '2018-08-16 09:12:38',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'Airbus'
        },
        {
          'id': 1459,
          'firstname': 'Gust',
          'lastname': 'Casper',
          'email': 'gust.casper@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 1,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:54',
          'updated_at': null,
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'default'
        },
        {
          'id': 1460,
          'firstname': 'Fidel',
          'lastname': 'Jones',
          'email': 'fidel.jones@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 281,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:54',
          'updated_at': '2018-08-16 09:19:01',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': '另一种语言 🇨🇳'
        },
        {
          'id': 1461,
          'firstname': 'Ambrose',
          'lastname': 'Grant',
          'email': 'ambrose.grant@example.com',
          'picture_url': null,
          'company_id': 1,
          'group_id': 199,
          'language': 'fr',
          'created_at': '2018-08-10 14:06:55',
          'updated_at': '2018-08-16 09:12:38',
          'activated': true,
          'destroyed': false,
          'role_name': 'standard',
          'group_name': 'Airbus'
        }
      ]
    }
  }
}

/**
 * Return the list of the applications in the specified group.
 * @method GET
 * @returns {Promise<ApiResponse>}
 */
export function listApplications ({ groupId }) {
  // const url = `${baseUrl}/${groupId}/application`
  // return get(url)
  return {
    status: 200,
    data: [
      {
        'id': 5,
        'name': 'TextIt',
        'picture_url': '/static/img/logo-textit.png',
        'created_at': '2018-03-20 11:07:00',
        'updated_at': null,
        'url': ''
      },
      {
        'id': 1,
        'name': 'Brainstormin',
        'picture_url': '/static/img/logo-brainstormin.png',
        'created_at': '2018-03-20 11:07:00',
        'updated_at': null,
        'url': ''
      },
      {
        'id': 2,
        'name': 'Sondage',
        'picture_url': '/static/img/logo-sondage.png',
        'created_at': '2018-03-20 11:07:00',
        'updated_at': null,
        'url': ''
      }
    ]
  }
}

/**
 * Update the specified group with the specified data.
 * @method PUT
 * @returns {Promise<ApiResponse>}
 */
export function update ({ groupId, ...data }) {
  const url = `${baseUrl}/${groupId}`
  return put(url, data)
}

/**
 * Delete the group corresponding with the specified id.
 * @method POST
 * @returns {Promise<ApiResponse>}
 */
export function remove ({ groupId }) {
  const url = `${baseUrl}/${groupId}`
  return deleteAsync(url)
}
