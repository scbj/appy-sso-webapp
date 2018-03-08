import { ARTICLE_LIST } from '../../mutation-types'

export default {
  [ARTICLE_LIST] (state, payload) {
    state.articles = payload.articles
  }
}
