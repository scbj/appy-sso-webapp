<template>
  <div class="ModalGroupCreate">
    <h2 class="ModalGroupCreate__title">{{ $t('title.createGroup') }}</h2>
    <ModalGroupCreateChooseName v-if="!groupName" @nameChosen="onNameChosen"/>
    <ModalFormAddUsers
      v-loading="creating"
      v-else
      primary-button-text-resource-name="button.createGroupWithPeoples"
      @users-added="onUsersAdded" />
  </div>
</template>

<script>
import ModalGroupCreateChooseName from './ModalGroupCreateChooseName'
import ModalFormAddUsers from '@/components/dashboard/modals/ModalFormAddUsers'
import { buildMessage } from '@/utils/message'

export default {
  components: {
    ModalGroupCreateChooseName,
    ModalFormAddUsers
  },

  data () {
    return {
      creating: false,
      groupName: '',
      users: []
    }
  },

  methods: {
    onNameChosen (name) {
      this.groupName = name
    },

    onUsersAdded (users) {
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

      this.$store.dispatch('ui/modal/close')
    },

    notifyUser (success) {
      const message = buildMessage(success
        ? 'groupCreateSuccess'
        : 'groupCreateError')
      this.$message(message)
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
