<template lang="pug">
.administration-panel-list-users
  el-input(
    placeholder='Search a user...'
    prefix-icon='el-icon-search'
    v-model='query'
    clearable
  )
</template>

<script>
export default {
  data () {
    return {
      query: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.administration-panel-list-users {
  width: 300px;
  height: 700px;
  background-color: white;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,.1);
  padding: 2rem;
}
</style>
