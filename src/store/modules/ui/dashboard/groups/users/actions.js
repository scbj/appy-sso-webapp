import UserProvider from '@/services/UserProvider'
import api from '@/api/v1'

const userProvider = new UserProvider({
  fields: [
    'id',
    'firstname',
    'lastname',
    'email',
    'picture_url'
  ],
  orderBy: 'firstname',
  pageSize: 8
})

export async function list ({ commit, state, rootState }, payload) {
  commit('SET_PENDING', true)

  const page = payload
    ? payload.page
    : state.currentPage
  const groupId = rootState.ui.dashboard.groups.activeGroupId

  const { data: response } = await userProvider.listFromGroup({
    page,
    groupId
  })
  if (response && response.data) {
    commit('SET_ALL', response.data)
    commit('SET_TOTAL_USER_COUNT', response.total)
  }

  commit('SET_PENDING', false)
}

export async function addUsers ({ dispatch, rootState }, payload) {
  const groupId = rootState.ui.dashboard.groups.activeGroupId
  const { userIds } = payload
  const { status } = await api.group.addUsers(groupId, userIds)

  // We must update the user count of all groups and re-fetch the user list
  // of the active group
  if (status === 200) {
    dispatch('group/list', {}, { root: true })
    dispatch('ui/dashboard/groups/users/list', {}, { root: true })
  }
}

export async function removeSelectedUsers ({ state, dispatch, commit, rootState, rootGetters }) {
  commit('SET_PENDING', true)

  const groupId = rootState.ui.dashboard.groups.activeGroupId
  const userIds = state.selectedUsers
  const { status, data: group } = await api.group.removeUsers({
    groupId,
    userIds
  })

  // We must update the user count of the group in the existing list
  if (status === 200) {
    // Get all the groups EXCEPT the one concerned
    const groups = rootState.group.all.filter(x => x.id !== group.id)

    // We recreate the array with the new object (with the new name)
    commit('group/SET_ALL', [ group, ...groups ], { root: true })

    commit('SET_SELECTED_USERS', [])
    await dispatch('list')
  }
  commit('SET_PENDING', false)
}

export async function reset ({ commit }) {
  commit('SET_PENDING', false)
  commit('SET_SELECTED_USERS', [])
}
