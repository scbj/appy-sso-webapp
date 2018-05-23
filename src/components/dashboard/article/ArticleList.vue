<template lang="pug">
.article-list
  ArticleItem(
    v-for='article in articles'
    :key='article.id'
    :content='article.content')
</template>

<script>
import { get } from 'vuex-pathify'

import ArticleItem from './ArticleItem'

export default {
  components: {
    ArticleItem
  },

  computed: {
    articles: get('article/articles')
  },

  mounted () {
    this.$store.dispatch('article/list')
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/vars.scss';

.article-list {
  padding: 1rem 1rem;

  @media screen and (min-width: $mobile) {
    padding: 1rem 0;
  }
}
</style>
