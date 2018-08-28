<template>
  <div class="UserListHeader">
    <div class="UserList__cell UserList__checkbox">
      <el-checkbox style="visibility:hidden" />
    </div>
    <div
      v-for="column in columns"
      :key="column.label"
      :style="getCellStyle(column)"
      class="UserList__cell UserListHeader-cell">
      {{ column.label }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    columns () {
      return this.$parent.columns || []
    },

    getCellStyle () {
      return this.$parent.getCellStyle || (_ => {})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/colors.scss';
@import '../../assets/scss/components/user-list.scss';

.UserListHeader {
  color: $primaryColor;
  font-size: .8em;
  font-weight: 400;
  height: 4rem;
  user-select: none;
}
</style>
