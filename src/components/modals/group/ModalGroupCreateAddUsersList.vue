<template lang="pug">
ul.ModalGroupCreateAddUsersList
  li.ModalGroupCreateAddUsersList__users(
    v-for='user in users'
    :key='user.id'
  )
    el-checkbox( :checked='isSelected(user.id)' @change='changeSelection(user, $event)') {{ user.firstname }} {{ user.lastname }}
    span.ModalGroupCreateAddUsersList__email {{ user.email }}
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
.ModalGroupCreateAddUsersList__users {
  margin-bottom: .5em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ModalGroupCreateAddUsersList__email {
  margin-left: 1em;
  font-size: 14px;
  color: #A250E5;
}
</style>
