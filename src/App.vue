<template lang="pug">
#app
  router-view
  TheModal
</template>

<script>
import { get } from 'vuex-pathify'

import TheModal from '@/components/TheModal'
import { changeLocale } from './i18n/index'
import { setAuthorizationHeader } from './http-common'

export default {
  name: 'App',

  components: {
    TheModal
  },

  computed: {
    shouldBodyScrollable: get('ui/modal/shouldBodyScrollable')
  },

  watch: {
    shouldBodyScrollable (value) {
      document.body.style.paddingRight = value ? '' : '6px'
      document.body.style.overflowY = value ? '' : 'hidden'
    }
  },

  created () {
    this.chooseLanguage({
      initial: this.$i18n.locale,
      userLanguage: this.$store.get('user/current@language')
    })
    this.authenticateRequest({
      token: this.$store.state.auth.token
    })
  },

  methods: {
    /** Store current language or uses the existing one.  */
    chooseLanguage ({ initial, userLanguage }) {
      if (userLanguage && userLanguage !== initial) {
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
