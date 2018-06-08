<template lang="pug">
.ModalGroupCreate
  h2.ModalGroupCreate__title {{ $t('title.createGroup') }}
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
      this.$store.dispatch('modal/close')
    }
  }
}
</script>

<style lang="scss" scoped>
.ModalGroupCreate__title {
  font-size: 2rem;
  font-weight: 600;
  color: #373737;
  margin-bottom: 1rem;
}
</style>
