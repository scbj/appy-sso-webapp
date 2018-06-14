// TODO: Refactoriser ce code qui se répète  (commitOnDashboardAdministration)

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

export async function createAndAddUsers ({ dispatch }, payload) {
  // Send the create group request
  const { data: group } = await api.group.create(payload.name)
  if (!group) {
    return false
  }

  // update the groups list
  dispatch('list')

  if (payload.users.length === 0) {
    return group
  }
  const addUsersResponse = await api.group.addUsers(group.id, payload.users)
  return addUsersResponse.status === 200
    ? group
    : null
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

export async function rename ({ dispatch }, payload) {
  const { status } = await api.group.update(payload)
  if (status !== 201) {
    return false
  }

  // update the groups list
  dispatch('list')
  return true
}

export async function remove ({ commit, dispatch, rootState }, payload) {
  const commitOnDashboardAdministration = (name, value) => commit(
    `dashboardAdministration/${name}`,
    value,
    { root: true }
  )

  const { status } = await api.group.remove(payload)
  if (status !== 200) {
    return false
  }
  const { defaultGroupId } = rootState.dashboardAdministration
  commitOnDashboardAdministration('SET_ACTIVE_GROUP_ID', defaultGroupId)

  // update the groups list
  dispatch('list')

  return true
}
