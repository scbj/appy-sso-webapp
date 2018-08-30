<template>
  <div class="AuthLoginContinue">
    <p v-html="$t('message.alreadyLogged')" />
    <BaseButton
      :title="shouldTruncateUsername ? username : null"
      class="AuthLoginContinue__continue-button"
      @click="continueLoggedIn">
      <span v-html="primaryButtonHtml" />
    </BaseButton>
    <BaseButton
      class="AuthLoginContinue__logout-button"
      type="secondary"
      @click="logout">
      {{ $t('button.logOut') }}
    </BaseButton>
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

  .AuthLoginContinue__continue-button {
    margin-top: 2rem;
  }
  .AuthLoginContinue__logout-button {
    margin-top: 1rem;
  }
}
</style>
