import * as types from '@/store/mutation-types'
import api from '@/api/v1/'

export async function list ({ commit }) {
  const res = await api.article.list()
  const articles = res.data

  if (!articles) {
    return false
  }

  commit(types.ARTICLE_LIST, { articles })
}
