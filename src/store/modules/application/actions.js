import * as types from '@/store/mutation-types'
import api from '@/api/v1/'

export async function list ({ commit }) {
  const res = await api.application.list()
  const applications = res.data

  if (!applications) {
    return false
  }

  commit(types.APPLICATION_LIST, { applications })
}
