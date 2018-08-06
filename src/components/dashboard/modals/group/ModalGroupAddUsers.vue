<template lang="pug">
.ModalGroupAddUsers
  h2.ModalGroupAddUsers__title {{ $t('title.addUsers') }}
  ModalGroupCreateAddUsers(
    v-loading='pending'
    @usersAdded='usersAdded' )
</template>

<script>
import { get } from 'vuex-pathify'

import ModalGroupCreateAddUsers from './ModalGroupCreateAddUsers'

export default {
  components: {
    ModalGroupCreateAddUsers
  },

  computed: {
    activeGroup: get('dashboard/groups/activeGroup')
  },

  data () {
    return {
      pending: false
    }
  },

  methods: {
    async usersAdded (users) {
      this.pending = true

      await this.$store.dispatch('dashboard/groups/addUsers', {
        groupId: this.activeGroup.id,
        userIds: users
      })

      this.close()
    },

    close () {
      this.$store.dispatch('ui/modal/close')
    }
  }
}
</script>

<style lang="scss" scoped>
.ModalGroupAddUsers__title {
  font-size: 2rem;
  font-weight: 600;
  color: #373737;
  margin-bottom: 1rem;
}
</style>
