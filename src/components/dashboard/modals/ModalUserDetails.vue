<template>
  <div v-loading="!ready" class="ModalUserDetails">
    <UserInfos
      v-if="isActivated"
      :user="fetchedUser"
      @delete-user="deleteUser" />
    <GuestUser
      v-else
      :user="user"
      @delete-user="deleteUser" />
  </div>
</template>

<script>
import { Message as showMessage } from 'element-ui'

import api from '@/services/api/v1'
import GuestUser from '@/components/user/GuestUser'
import UserInfos from '@/components/user/UserInfos'

export default {
  components: {
    GuestUser,
    UserInfos
  },

  props: {
    user: {
      type: Object,
      required: true
    }
  },

  data () {
    return {
      ready: !this.user.activated,
      fetchedUser: this.user
    }
  },

  computed: {
    isActivated () {
      return !!this.user.activated
    }
  },

  async created () {
    // If the user is activated we must download all this general information before displaying anything
    if (this.isActivated) {
      const { status, data: user } = await api.user.fetch({
        id: this.user.id
      })

      // If an error has occurred that prevents the retrieval of user information then handle the error and exit the current function
      if (status !== 200) return this.handleLoadingFailure()

      // Otherwise where everything went well, store the user in order to give it in props to the children
      this.fetchedUser = user
    }

    // The initial loading is complete we can now display the other underlying components
    this.ready = true
  },

  methods: {
    handleLoadingFailure () {
      showMessage({
        message: this.$t('error.canNotRetreiveUserInformations'),
        type: 'error'
      })
      this.$store.dispatch('ui/modal/close')
    },

    async deleteUser () {
      const { status } = await api.user.remove(this.user.id)
      if (status === 200) {
        this.$store.dispatch('ui/modal/close')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ModalUserDetails {
  font-size: 1.36rem;
}
</style>
