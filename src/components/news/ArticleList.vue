<template lang="pug">
.ArticleList
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
