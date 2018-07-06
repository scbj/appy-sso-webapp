import { make } from 'vuex-pathify'
import api from '@/api/v1/index'

export const state = {
  pending: false,
  activeGroup: null,
  defaultGroup: null,
  list: []
}

export const getters = {
  ...make.getters(state),

  sortedList (state) {
    const compare = (a, b) => {
      const nameA = a.name && a.name.toLowerCase()
      const nameB = b.name && b.name.toLowerCase()
      if (nameA > nameB) return 1
      else if (nameA < nameB) return -1

      // No difference between the two
      return 0
    }
    const groups = [...state.list]
    return groups.sort(compare)
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
      if (state.activeGroup === null) {
        commit('SET_ACTIVE_GROUP', defaultGroup)
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
