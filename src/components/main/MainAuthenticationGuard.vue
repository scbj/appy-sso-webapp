<template>
  <transition name="fade">
    <div v-show="requiresTokenRefreshing" class="MainAuthenticationGuard">
      <BaseImage class="MainAuthenticationGuard__logo" src="/static/img/title-gradient.svg" />
      <span class="MainAuthenticationGuard__state">
        🔑&nbsp; {{ $t('message.updatingAuthentication') }}
      </span>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      requiresTokenRefreshing: true
    }
  },

  watch: {
    requiresTokenRefreshing: {
      immediate: true,
      handler (newValue) {
        // A new token request must be issued each time the variable passed to true.
        // And also when first loading the component.
        newValue && this.requestNewToken()
      }
    }
  },

  mounted () {
    this.initializeAutomaticRefresh()
  },

  methods: {
    async requestNewToken () {
      const { status } = await this.$store.dispatch('auth/refreshAccessToken')

      // If the refreshing of the token is a failure we must ask the user to reconnect
      if (status !== 200) {
        this.$store.dispatch('auth/logout')
        return this.$router.push({ name: 'login' })
      }

      this.requiresTokenRefreshing = false
      this.$emit('token-refreshed')
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

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
