<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { changeLocale } from './i18n/index'

export default {
  name: 'App',
  mounted () {
    this.initialiazeUserLanguage(this.$i18n.locale, this.$store.state.user.language)
  },
  methods: {
    initialiazeUserLanguage (current, userLanguage) {
      if (userLanguage === null) {
        this.$store.dispatch('user/changeLanguage', { locale: current })
      } else if (userLanguage !== current) {
        changeLocale(userLanguage)
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
