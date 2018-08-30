<template>
  <li class="ArticleListItem html-content" v-html="content" />
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
.ArticleListItem {
  // background: white;
  border: 1px solid rgba(#ececec, .2);
  border-radius: 12px;
  user-select: text;
  margin: 2rem 0;
  // box-shadow: 0 16px 40px -2px rgba(0,0,0,.04);
  transition: box-shadow .2s ease-in-out;

  &:first-of-type {
    margin-top: 0;
  }
}
</style>
