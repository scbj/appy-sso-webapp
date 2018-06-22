<template lang="pug">
.ModalGroupCreate
  h2.ModalGroupCreate__title {{ $t('title.createGroup') }}
  ModalGroupCreateChooseName(
    v-if='!groupName'
    @nameChosen='nameChosen' )
  ModalGroupCreateAddUsers(
    v-loading='creating'
    v-else
    @usersAdded='usersAdded' )
</template>

<script>
import ModalGroupCreateChooseName from './ModalGroupCreateChooseName'
import ModalGroupCreateAddUsers from './ModalGroupCreateAddUsers'
import { buildMessage } from '@/components/message'

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

      const group = await this.$store.dispatch('group/createAndAddUsers', {
        name: this.groupName,
        users: this.users
      })

      this.notifyUser(!!group)

      this.close()
    },

    notifyUser (success) {
      const message = buildMessage(success
        ? 'groupCreateSuccess'
        : 'groupCreateError')
      this.$message(message)
    },

    close () {
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
