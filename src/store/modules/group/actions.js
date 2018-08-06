import api from '@/api/v1'

export async function list ({ commit }) {
  // Retrieve from the API the list of all groups in the company
  const { data: groups } = await api.group.list()

  // We have to make sure we work well with a painting
  if (!groups || !Array.isArray(groups)) {
    return false
  }

  // If it exists in the list, we must isolate the default group
  const defaultGroup = groups.find(group => group.name === 'default')
  if (defaultGroup) {
    commit('SET_DEFAULT_GROUP', defaultGroup)

    // We need to remove the default group from the initial group list
    const defaultGroupIndex = groups.indexOf(defaultGroup)
    groups.splice(defaultGroupIndex, 1)
  }

  // Store the final group list
  commit('SET_ALL', groups)
}

export async function createAndAddUsers ({ state, commit }, payload) {
  // This function must receive parameters
  if (!payload) return

  const { name, users } = payload
  let { status, data: group } = await api.group.create({ name })

  if (status !== 200) return null

  // If the group has been created so we have to add users then we update the user counter afterwards
  if (users && users.length > 0) {
    const { status, data } = await api.group.addUsers(group.id, users)
    if (status === 200) {
      group.userCount = data.userCount
    }
  }

  // The group must be added to the existing list
  commit('SET_ALL', [ group, ...state.all ])

  return group
}

export async function rename ({ state, commit }, payload) {
  const { status, data: group } = await api.group.update(payload)
  const success = status === 200

  // We must rename the group in the existing list
  if (success) {
    // Get all the groups EXCEPT the one concerned
    const groups = state.all.filter(x => x.id !== group.id)

    // We recreate the array with the new object (with the new name)
    commit('SET_ALL', [ group, ...groups ])
  }

  return success
}
