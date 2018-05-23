import api from '@/api/v1/'

export async function list ({ commit }) {
  const res = await api.article.list()
  const articles = res.data

  if (!articles) {
    return false
  }

  commit('SET_ARTICLES', articles)
}
