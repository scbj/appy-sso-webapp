<template lang="pug">
.modal-group-create-add-users-list
  .list-item(
    v-for='user in users'
    :key='user.id'
  )
    el-checkbox( :checked='isSelected(user.id)' @change='changeSelection(user, $event)') {{ user.firstname }} {{ user.lastname }}
    span.email {{ user.email }}
</template>

<script>
export default {
  props: {
    users: {
      required: true,
      type: Array
    },
    selectedUsers: {
      required: true,
      type: Array
    }
  },

  methods: {
    isSelected (id) {
      return this.selectedUsers.includes(id)
    },

    changeSelection (user, isChecked) {
      const eventName = isChecked ? 'userSelected' : 'userUnselected'
      this.$emit(eventName, user)
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  margin-bottom: .5em;
}

.email {
  margin-left: 1em;
  font-size: 14px;
  color: #A250E5;
}
</style>
