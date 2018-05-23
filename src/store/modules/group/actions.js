import * as types from '@/store/mutation-types'
import api from '@/api/v1/index'

export async function list ({ commit }) {
  const res = await api.group.list()
  const groups = res.data

  if (!groups) {
    return false
  }

  commit(types.GROUP_LIST, { groups })
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
