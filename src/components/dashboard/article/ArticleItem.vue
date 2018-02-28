<template lang="pug">
.article-item.html-content( v-html='content' )
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.article-item {
  max-width: 800px;
  margin: 4rem 0;

  &:first-of-type {
    margin-top: 0;
  }
}
</style>
