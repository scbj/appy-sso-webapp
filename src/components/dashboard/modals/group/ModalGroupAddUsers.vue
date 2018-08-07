<template>
  <div class="ModalGroupAddUsers">
    <h2 class="ModalGroupAddUsers__title">{{ $t('title.addUsers') }}</h2>
    <ModalFormAddUsers
      v-loading="pending"
      primary-button-text-resource-name="button.addUsers"
      @users-added="onUsersAdded" />
  </div>
</template>

<script>
import ModalFormAddUsers from '@/components/dashboard/modals/ModalFormAddUsers'

export default {
  components: {
    ModalFormAddUsers
  },

  data () {
    return {
      pending: false
    }
  },

  methods: {
    async onUsersAdded (users) {
      this.pending = true

      await this.$store.dispatch('ui/dashboard/groups/users/addUsers', {
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
