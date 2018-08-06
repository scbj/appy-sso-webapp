import { make } from 'vuex-pathify'

import UserProvider from '@/services/UserProvider'
import api from '../../../../../api/v1/index'

const userProvider = new UserProvider({
  fields: [ 'id', 'firstname', 'lastname', 'email', 'pictureUrl', 'created_at', 'updated_at' ],
  orderBy: 'firstname',
  pageSize: 8
})

export const state = {
  pending: true,
  all: [],
  currentPage: 1,
  selectedUsers: [],
  totalUserCount: 0
}

export const mutations = make.mutations(state)

export const actions = {
  async list ({ commit, state }, payload) {
    commit('SET_PENDING', true)

    const page = payload && payload.page

    const { data: response } = await userProvider.list({
      page: page || state.currentPage
    })
    if (response && response.data) {
      commit('SET_ALL', response.data)
      commit('SET_TOTAL_USER_COUNT', response.total)
    }

    commit('SET_PENDING', false)
  },

  async deleteSelectedUsers ({ state, dispatch, commit }) {
    commit('SET_PENDING', true)

    const response = await api.user.remove(...state.selectedUsers)
    if (response.status === 200) {
      commit('SET_SELECTED_USERS', [])
      await dispatch('list')
    }

    commit('SET_PENDING', false)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
