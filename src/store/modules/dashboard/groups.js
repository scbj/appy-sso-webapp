import { make } from 'vuex-pathify'
import api from '@/api/v1/index'
import { sortAlphabetically } from '@/utils/array'

export const state = {
  pending: false,
  // activeGroup: null,
  activeGroupId: -1,
  defaultGroup: null,
  list: []
}

export const getters = {
  ...make.getters(state),

  sortedList (state) {
    const groups = state.list
    return sortAlphabetically(groups, 'name')
  },

  activeGroup (state, getters) {
    if (getters.isDefaultGroup) return state.defaultGroup
    return state.list.find(group => group.id === state.activeGroupId)
  },

  isDefaultGroup (state) {
    return state.defaultGroup
      ? state.activeGroupId === state.defaultGroup.id
      : false
  }
}

export const actions = {
  async list ({ commit, state }) {
    commit('SET_PENDING', true)

    const { data: groups } = await api.group.list()

    if (!groups) {
      return false
    }

    const defaultGroup = groups.find(group => group.name === 'default')
    if (defaultGroup) {
      commit('SET_DEFAULT_GROUP', defaultGroup)

      const keepActiveGroup = !!groups.find(group => group.id === state.activeGroupId)
      if (!keepActiveGroup) {
        commit('SET_ACTIVE_GROUP_ID', defaultGroup.id)
      }
    }

    // Remove the default group from the group list
    const index = groups.indexOf(defaultGroup)
    groups.splice(index, 1)

    commit('SET_LIST', groups)
    commit('SET_PENDING', false)

    return true
  }
}

export const mutations = make.mutations(state)

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
