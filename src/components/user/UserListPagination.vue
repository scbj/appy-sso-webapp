<template>
  <el-pagination
    :total="total"
    :page-size="pageSize"
    @current-change="onCurrentChange"
    class="UserListPagination"
    background
    layout="prev,pager,next" />
</template>

<script>
export default {
  props: {
    /** Total item count. */
    total: {
      type: Number,
      required: true
    },
    /** Item count of each page. */
    pageSize: {
      type: Number,
      default: 8
    }
  },

  methods: {
    /**
     * Occurs when @current-change event is raised from <el-pagination> component.
     * @param {Number} page
     */
    onCurrentChange (page) {
      this.$parent.$emit('page-changed', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.UserListPagination {
  margin-top: 2rem;
}
</style>
