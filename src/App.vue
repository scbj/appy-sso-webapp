<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { changeLocale } from './i18n/index'
import { setAuthorizationHeader } from './http-common'

export default {
  name: 'App',

  created () {
    this.openTheStore()
  },

  methods: {
    /**
     * Do the needed stuff before use app. Set language,
     * retreive the token and add it to the axios headers..etc.
     */
    openTheStore () {
      this.chooseLanguage({
        initial: this.$i18n.locale,
        userLanguage: this.$store.state.user.language
      })
      this.authenticateRequest({
        token: this.$store.state.auth.token
      })
    },
    /** Store current language or uses the existing one.  */
    chooseLanguage ({ initial, userLanguage }) {
      if (userLanguage === null) {
        this.$store.dispatch('user/changeLanguage', { locale: initial })
      } else if (userLanguage !== initial) {
        changeLocale(userLanguage)
      }
    },
    /** Set authorization header on axios. */
    authenticateRequest ({ token }) {
      if (token) {
        setAuthorizationHeader(token)
      }
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/base';

#app {
  height: 100%
}
</style>
