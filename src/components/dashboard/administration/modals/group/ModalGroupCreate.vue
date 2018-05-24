<template lang="pug">
BaseModal.modal-group-create(
  v-on='$listeners'
  v-bind='$attrs' )
  h2.title {{ $t('title.createGroup') }}
  ModalGroupCreateChooseName(
    v-if='!groupName'
    @nameChosen='nameChosen'
    @requestClose='close' )
  ModalGroupCreateAddUsers(
    v-loading='creating'
    v-else
    @usersAdded='usersAdded'
    @requestClose='close' )
</template>

<script>
import ModalGroupCreateChooseName from './ModalGroupCreateChooseName'
import ModalGroupCreateAddUsers from './ModalGroupCreateAddUsers'

export default {
  inheritAttrs: false,

  components: {
    ModalGroupCreateChooseName,
    ModalGroupCreateAddUsers
  },

  data () {
    return {
      creating: false,
      groupName: '',
      users: []
    }
  },

  methods: {
    nameChosen (name) {
      this.groupName = name
    },

    usersAdded (users) {
      this.users = users
      this.createGroup()
    },

    async createGroup () {
      this.creating = true

      const success = await this.$store.dispatch('group/createAndAddUsers', {
        name: this.groupName,
        users: this.users
      })

      this.notifyUser(success)

      this.creating = false
      this.close()
    },

    notifyUser (success) {
      if (success) {
        this.$message({
          message: this.$t('message.groupCreatedSuccess'),
          type: 'success'
        })
      }
    },

    close () {
      this.groupName = ''
      this.users = ''
      this.$store.dispatch('ui/closeModalGroupCreate')
      this.$store.dispatch('user/cleanList')
    }
  }
}
</script>
