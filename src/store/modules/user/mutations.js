import {
  CHANGE_LANGUAGE,
  USER_FETCH
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
  }
}
