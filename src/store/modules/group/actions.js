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
      'dashboard/groups/SET_DEFAULT_GROUP',
      defaultGroup,
      { root: true }
    )

    // Remove the default group from the group list
    const defaultGroupIndex = groups.indexOf(defaultGroup)
    groups.splice(defaultGroupIndex, 1)
  }

  commit('SET_GROUPS', groups)
}

export async function createAndAddUsers (_, payload) {
  // Send the create group request
  const { data: group } = await api.group.create(payload.name)
  if (!group) {
    return false
  }

  if (payload.users.length === 0) {
    return group
  }
  const addUsersResponse = await api.group.addUsers(group.id, payload.users)
  return addUsersResponse.status === 200
    ? group
    : null
}

export async function rename ({ dispatch }, payload) {
  const { status } = await api.group.update(payload)
  return status === 200
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

export async function removeUsers (_, payload) {
  const { groupId, ids } = payload
  return api.group.removeUsers(groupId, ids)
}
