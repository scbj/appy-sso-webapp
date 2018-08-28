<template>
  <div id="app">
    <router-view />
    <TheModal />
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

import TheModal from '@/components/TheModal'
import i18n from '@/i18n'
import { setAuthorizationHeader } from '@/plugins/axios'

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
      token: this.$store.get('auth/accessToken')
    })
  },

  methods: {
    /** Store current language or uses the existing one.  */
    chooseLanguage ({ initial, userLanguage }) {
      if (userLanguage && userLanguage !== initial) {
        i18n.locale = userLanguage
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
@import './assets/scss/base.scss';

#app {
  height: 100%
}
</style>
