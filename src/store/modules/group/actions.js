import api from '@/api/v1/index'

export async function createAndAddUsers ({ commit }, payload) {
  // Send the create group request
  const createResponse = await api.group.create(payload.name)
  if (!createResponse.data) {
    return false
  } else if (payload.users.length === 0) {
    return true
  }

  // We must retrieve the id
  const { id } = createResponse.data
  const addUsersResponse = await api.group.addUsers(id, payload.users)
  return addUsersResponse.status === 200
}
