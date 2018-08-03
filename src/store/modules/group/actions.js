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
