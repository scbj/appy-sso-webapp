import UserProvider from '@/services/UserProvider'
import api from '@/services/api/v1'

const userProvider = new UserProvider({
  fields: [ 'id', 'firstname', 'lastname', 'email', 'picture_url', 'created_at', 'updated_at' ],
  orderBy: 'firstname',
  pageSize: 8
})

export async function create (_, payload) {
  const { status } = await api.user.create(payload)
  return status === 200
}

export async function list ({ commit, state }, payload) {
  commit('SET_PENDING', true)

  const page = payload && payload.page

  const { data: response } = await userProvider.list({
    page: page || state.currentPage
  })
  if (response) {
    console.log('TCL: response', response)
    commit('SET_ALL', response.data)
    commit('SET_CURRENT_PAGE', response.currentPage)
    commit('SET_TOTAL_USER_COUNT', response.total)
  }

  commit('SET_PENDING', false)
}

export async function search ({ commit, state }, payload) {
  commit('SET_PENDING', true)

  const { data: response } = await userProvider.search(payload)
  if (response) {
    commit('SET_ALL', response.data)
    commit('SET_TOTAL_USER_COUNT', response.total)
  }

  commit('SET_PENDING', false)
}

export async function deleteSelectedUsers ({ state, dispatch, commit }) {
  commit('SET_PENDING', true)

  const response = await api.user.remove(...state.selectedUsers)
  if (response.status === 200) {
    commit('SET_SELECTED_USERS', [])
    await dispatch('list')
  }

  commit('SET_PENDING', false)
}
