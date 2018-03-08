<template lang="pug">
.article-list
  ArticleItem(
    v-for='article in articles'
    :key='article.id'
    :content='article.content')
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ArticleItem from './ArticleItem'

const { mapState } = createNamespacedHelpers('article')

export default {
  components: {
    ArticleItem
  },

  computed: {
    ...mapState([
      'articles'
    ])
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
