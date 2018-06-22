<template lang="pug">
.LoginContinue
  p( v-html="$t('message.alreadyLogged')" )
  el-button(
    type='primary'
    size='big'
    v-html="primaryButtonHtml"
    @click='continueLoggedIn'
    :title='shouldTruncateUsername ? username : null')
  el-button(
    type='text'
    size='big'
    v-text="$t('button.logOut')"
    @click='logout')
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters } = createNamespacedHelpers('user')

export default {
  computed: {
    ...mapGetters([
      'username'
    ]),
    /** @returns {Boolean} */
    shouldTruncateUsername () {
      return this.username.length > 14
    },
    /** @returns {String} */
    primaryButtonHtml () {
      const username = this.shouldTruncateUsername
        ? `${this.username.substring(0, 11)}...`
        : this.username
      return this.$t('button.continueAs', { username })
    }
  },

  methods: {
    continueLoggedIn () {
      // stay connected and redirect the user to the dashboard
      this.$router.push({ name: 'dashboard' })
    },
    logout () {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.LoginContinue {
  text-align: center;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;

  .el-button {
    display: block;
  }
}
</style>
