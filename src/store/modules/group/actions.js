import api from '@/api/v1/index'

export async function list ({ commit }) {
  const res = await api.group.list()
  const groups = res.data

  if (!groups) {
    return false
  }

  const defaultGroup = groups.find(group => group.name === 'default')
  if (defaultGroup) {
    commit(
      'dashboardAdministration/SET_DEFAULT_GROUP_ID',
      defaultGroup.id,
      { root: true }
    )

    // Remove the default group from the group list
    const defaultGroupIndex = groups.indexOf(defaultGroup)
    groups.splice(defaultGroupIndex, 1)
  }

  commit('SET_GROUPS', groups)
}

export async function createAndAddUsers ({ commit, dispatch }, payload) {
  // Send the create group request
  const createResponse = await api.group.create(payload.name)
  if (!createResponse.data) {
    return false
  }

  // update the groups list
  dispatch('list')

  if (payload.users.length === 0) {
    return true
  }

  // We must retrieve the id
  const { id } = createResponse.data
  const addUsersResponse = await api.group.addUsers(id, payload.users)
  return addUsersResponse.status === 200
}

export async function listUsers ({ commit }, payload) {
  const commitOnDashboardAdministration = (name, value) => commit(
    `dashboardAdministration/${name}`,
    value,
    { root: true }
  )

  const res = await api.group.listUsers(payload)
  const data = res.data
  if (data) {
    commitOnDashboardAdministration('SET_TOTAL_USERS', data.total)

    // Convert 'per_page' string data to number with + sign
    commitOnDashboardAdministration('SET_PAGE_SIZE', +data.per_page)
    commitOnDashboardAdministration('SET_USERS', data.data)
  }
}
