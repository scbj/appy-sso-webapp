<template>
  <div class="AuthLoginContinue">
    <p v-html="$t('message.alreadyLogged')" />
    <el-button
      :title="shouldTruncateUsername ? username : null"
      type="primary"
      size="big"
      @click="continueLoggedIn"
      v-html="primaryButtonHtml"/>
    <el-button
      type="text"
      size="big"
      @click="logout"
      v-text="$t('button.logOut')"/>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  computed: {
    username: get('user/username'),

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
      this.$router.push({ name: 'home' })
    },
    logout () {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>

<style lang="scss" scoped>
.AuthLoginContinue {
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
