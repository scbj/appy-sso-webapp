<template>
  <li class="UserListRow">
    <div class="UserList__cell UserList__checkbox">
      <el-checkbox :checked="selected" @change="onCheckChanged"/>
    </div>
    <div
      v-for="column in columns"
      :key="column.label"
      class="UserList__cell"
      :style="getCellStyle(column)">
      <slot
        v-if="column.slot"
        :name="column.slot"
        :user="user"
        :value="user[column.prop]"/>
      <span v-else>{{ user[column.prop] }}</span>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    columns () {
      return this.$parent.columns || []
    },

    getCellStyle () {
      return this.$parent.getCellStyle || (_ => {})
    }
  },

  methods: {
    onCheckChanged (selected) {
      this.$emit('selection-changed', selected)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/colors.scss';
@import '../../assets/scss/UserList.scss';

.UserListRow {
  background: transparent;
  border-radius: 6px;
  height: 3.2rem;
  transition: all .1s ease-in-out;

  &:hover {
    background: rgba(black, .04);
    transition: all .05s ease-in;
  }
}
</style>
