<template>
  <transition name="fade">
    <div v-show="requiresTokenRefreshing" class="AuthGuard">
      <AppLogo class="AuthGuard__logo" />
      <span class="AuthGuard__state">
        🔑&nbsp; {{ $t('message.updatingAuthentication') }}
      </span>
    </div>
  </transition>
</template>

<script>
import AppLogo from '@/components/app/AppLogo'

export default {
  components: {
    AppLogo
  },

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
      await this.$store.dispatch('user/fetchSelf')

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

.AuthGuard {
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

.AuthGuard__logo {
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
