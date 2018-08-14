import groups from './groups'
import users from './users'

import ModalUserDetails from '@/components/dashboard/modals/ModalUserDetails'

export const actions = {
  openUserDetails ({ dispatch }, payload) {
    if (!payload) return

    // We must pass the parameters so that the UserDetails component can know the id of the user to display
    dispatch('ui/modal/open', {
      content: ModalUserDetails,
      params: payload
    }, {
      root: true
    })
  }
}

export default {
  namespaced: true,
  actions,
  modules: {
    groups,
    users
  }
}
