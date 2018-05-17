<template lang="pug">
BaseModal.modal-group-create( v-on='$listeners' v-bind='$attrs' )
  h2.title Créer un groupe
  ModalGroupCreateChooseName(
    v-if='!groupName'
    @nameChosen='nameChosen'
    @requestClose='close' )
  ModalGroupCreateAddUsers(
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
    },

    close () {
      this.groupName = ''
      this.users = ''
      this.$store.dispatch('ui/closeModal')
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 2rem;
  font-weight: 600;
  // color: #A250E5;
  --text-color: #373737;
  color: var(--text-color);
  margin-bottom: 1rem;
}
</style>
