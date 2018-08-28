<template>
  <div class="ArticleList">
    <ArticleListItem
      v-for="article in articles"
      :key="article.id"
      :content="article.content" />
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

import ArticleListItem from './ArticleListItem'

export default {
  components: {
    ArticleListItem
  },

  computed: {
    articles: get('article/all')
  },

  mounted () {
    this.$store.dispatch('article/list')
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/vars.scss';

.ArticleList {
  padding: 1rem 1rem;
  margin: 0 auto;
  max-width: 800px;

  @media screen and (min-width: $mobile) {
    padding: 1rem 0;
  }
}
</style>
