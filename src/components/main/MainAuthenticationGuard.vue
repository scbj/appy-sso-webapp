<template>
  <transition name="fade">
    <div v-show="requiresTokenRefreshing" class="MainAuthenticationGuard">
      <BaseImage class="MainAuthenticationGuard__logo" src="/static/img/title-gradient.svg" />
      <span class="MainAuthenticationGuard__state">
        {{ state }}
      </span>
    </div>
  </transition>
</template>

<script>
import { sync } from 'vuex-pathify'

import api from '@/api/v1'
import { setAuthorizationHeader } from '@/http-common'

export default {
  computed: {
    token: sync('auth/token'),
    refreshToken: sync('auth/refreshToken')
  },

  data () {
    return {
      state: 'Chargement du composant...',
      requiresTokenRefreshing: true
    }
  },

  watch: {
    requiresTokenRefreshing: {
      immediate: true,
      handler () {
        // A new token request must be issued each time the variable is changed.
        // And also when first loading the component.
        this.requestNewToken()
      }
    }
  },

  mounted () {
    this.initializeAutomaticRefresh()
  },

  methods: {
    async requestNewToken () {
      this.state = "Mise à jour de l'authentification en cours..."
      const { status, data } = await api.auth.refreshToken({
        refreshToken: this.refreshToken
      })
      if (status === 200) {
        this.state = 'Enregistrement des préfèrences...'

        this.token = data.access_token

        // Updates HTTP request authentication token
        setAuthorizationHeader(this.token)

        this.refreshToken = data.refresh_token
        this.requiresTokenRefreshing = false
        this.$emit('token-refreshed')
      }
    },

    initializeAutomaticRefresh () {
      // We must be in the token request state every 12 hours
      const delay = 1000 * 60 * 60 * 12
      const requestRefreshToken = () => {
        this.requiresTokenRefreshing = true
      }
      setInterval(requestRefreshToken, delay)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/vars.scss';

.MainAuthenticationGuard {
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: $z-index-authentication-guard;
}

.MainAuthenticationGuard__logo {
  margin-bottom: 1em;
  height: 2.5rem;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .3s ease-in
}

.fade-leave-active {
  transition-duration: .14s ease-out
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
