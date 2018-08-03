import { make } from 'vuex-pathify'
import * as actions from '@/store/modules/group/actions'

export const state = {
  all: [],
  defaultGroup: null
}

export const getters = {
  current () {
    // TODO: Récuprer le groupId de l'utilisateur connecté
    return null
  }
}

export const mutations = make.mutations(state)

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
