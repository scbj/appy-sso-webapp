import {
  CHANGE_LANGUAGE,
  USER_FETCH,
  USER_LIST,
  USER_CLEAN_LIST
} from '../../mutation-types'

export default {
  [CHANGE_LANGUAGE] (state, payload) {
    state.language = payload.locale
  },

  [USER_FETCH] (state, payload) {
    state.id = payload.id
    state.firstname = payload.firstname
    state.lastname = payload.lastname
    state.email = payload.email
    state.pictureUrl = payload.pictureUrl
    state.language = payload.language
    state.companyId = payload.company_id
    state.roleName = payload.role_name
    state.createdAt = payload.created_at
  },

  [USER_LIST] (state, payload) {
    state.all.total = payload.total
    state.all.perPage = payload.perPage
    state.all.currentPage = payload.currentPage
    state.all.lastPage = payload.lastPage
    state.all.list = payload.users
  },

  [USER_CLEAN_LIST] (state, payload) {
    state.all.total = 0
    state.all.currentPage = 1
    state.all.perPage = 8
    state.all.lastPage = 0
    state.all.list = []
  }
}
