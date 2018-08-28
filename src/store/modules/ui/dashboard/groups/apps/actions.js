import api from '@/services/api/v1'

export async function list ({ commit, rootState }) {
  commit('SET_PENDING', true)

  const groupId = rootState.ui.dashboard.groups.activeGroupId

  const { data: apps } = await api.group.listApplications({ groupId })
  if (apps) {
    commit('SET_ALL', apps)
  }

  commit('SET_PENDING', false)
}

export async function addApps ({ dispatch, rootState }, payload) {
  const groupId = rootState.ui.dashboard.groups.activeGroupId
  const { appIds } = payload
  const { status } = await api.group.addApplications(groupId, appIds)

  if (status === 200) {
    /**
     * Because the API does not return a detailed list of the
     * added applications we must ask again to list all the
     * applications of the active group.
     */
    dispatch('group/list', {}, { root: true })
    dispatch('list')
  }
}

export async function removeSelectedApps ({ commit, state, rootState, rootGetters }) {
  commit('SET_PENDING', true)

  const groupId = rootState.ui.dashboard.groups.activeGroupId
  const appIds = state.selectedApps
  const { status } = await api.group.removeApps(groupId, appIds)

  // The list of existing applications must be updated if the applications have been deleted
  if (status === 200) {
    // We only keep the applications that are not selected
    const apps = state.all.filter(app => appIds.indexOf(app.id) === -1)
    commit('SET_SELECTED_APPS', [])
    commit('SET_ALL', apps)

    // We must update the app count of the active group in the existing list
    const isDefaultGroupActive = rootGetters['ui/dashboard/groups/isDefaultGroupActive']
    if (isDefaultGroupActive) {
      const defaultGroup = rootState.group.defaultGroup

      // Update the default group
      defaultGroup.appCount -= appIds.length
      commit('group/SET_DEFAULT_GROUP', defaultGroup, { root: true })
    } else {
      const activeGroup = rootGetters['ui/dashboard/groups/activeGroup']
      const groups = rootState.group.all.filter(x => x.id !== groupId)

      // Update the active group
      activeGroup.appCount -= appIds.length
      commit('group/SET_ALL', [ activeGroup, ...groups ], { root: true })
    }
  }

  commit('SET_PENDING', false)
}

export async function reset ({ commit }) {
  commit('SET_PENDING', false)
  commit('SET_SELECTED_APPS', [])
}
