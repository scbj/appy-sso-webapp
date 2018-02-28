<template lang="pug">
.login-continue
  p( v-html="$t('message.alreadyLogged')" )
  el-button(
    type='primary'
    size='big'
    v-html="buttonContinueLoggedInHtml"
    @click='continueLoggedIn')
  el-button(
    type='text'
    size='big'
    v-text="$t('button.logOut')"
    @click='logout')
</template>

<script>
export default {
  data () {
    return {
      username: 'John Doe'
    }
  },

  computed: {
    buttonContinueLoggedInHtml () {
      const username = this.username.length > 10
        ? `${this.username.substring(0, 7)}...`
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
.login-continue {
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
