import { make } from 'vuex-pathify'

import { i18n } from '@/i18n'

export const state = {
  pending: false,
  activeGroupId: -1,
  defaultGroupId: -1,
  totalUsers: 0,
  currentPage: 1,
  /** Number of user per page */
  pageSize: 8,
  users: [
    {
      id: 17,
      firstname: 'Abner',
      lastname: "O'Keefe",
      email: "Abner.O'Keefe@example.com",
      role_name: 'standard',
      created_at: new Date(2018, 4, 24, 16, 25, 52),
      updated_at: new Date(2018, 4, 24, 16, 35, 52)
    },
    {
      id: 3,
      firstname: 'Alex',
      lastname: 'Kemmer',
      email: 'Alex.Kemmer@example.com',
      role_name: 'standard',
      created_at: new Date(2018, 2, 12, 20, 45, 52),
      updated_at: new Date(2018, 4, 24, 16, 35, 52)
    },
    {
      id: 6,
      firstname: 'Amari',
      lastname: 'Bruen',
      email: 'Amari.Bruen@example.com',
      role_name: 'standard',
      created_at: new Date(2017, 11, 12, 20, 45, 52),
      updated_at: new Date(2018, 4, 24, 16, 35, 52)
    },
    {
      id: 10,
      firstname: 'Arvel',
      lastname: 'Kertzmann',
      email: 'Arvel.Kertzmann@example.com',
      role_name: 'standard',
      created_at: new Date(2018, 4, 12, 20, 45, 52),
      updated_at: new Date(2018, 4, 24, 16, 35, 52)
    },
    {
      id: 362,
      firstname: 'Benjamin',
      lastname: 'Rosier',
      email: 'benj@rosier@gmail.com',
      role_name: 'standard',
      created_at: new Date(2018, 4, 12, 20, 45, 52),
      updated_at: new Date(2018, 4, 24, 16, 35, 52)
    },
    {
      id: 448,
      firstname: 'Benjamin',
      lastname: 'Rosier',
      email: 'benj@rosierger@gmail.com',
      role_name: 'admin',
      created_at: new Date(2017, 2, 12, 20, 45, 52),
      updated_at: new Date(2018, 4, 24, 16, 35, 52)
    },
    {
      id: 450,
      firstname: 'Benjamin',
      lastname: 'Rosier',
      email: 'benj@ros94ierger@gmail.com',
      role_name: 'standard',
      created_at: new Date(2018, 4, 12, 20, 45, 52),
      updated_at: new Date(2018, 4, 24, 16, 35, 52)
    },
    {
      id: 454,
      firstname: 'Benjamin',
      lastname: 'Rosier',
      email: 'joze@gmail.com',
      role_name: 'standard',
      created_at: new Date(2018, 4, 12, 20, 45, 52),
      updated_at: new Date(2018, 4, 24, 16, 35, 52)
    }
  ],
  selectedUsers: []
}

export const getters = {
  ...make.getters(state),

  isDefaultGroupActive (state) {
    return state.activeGroupId === state.defaultGroupId
  },

  /** Returns the name of the selected group. */
  activeGroupName (state, getters, rootState) {
    if (getters.isDefaultGroupActive || state.activeGroupId === -1) {
      return i18n.t('byDefault')
    }
    const group = rootState.group.groups.find(group =>
      group.id === state.activeGroupId)
    return group.name
  }
}

export const mutations = make.mutations(state)

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
