<template>
  <div class="ViewApp">
    <template v-if="ready">
      <AppHeader v-if="$mq !== 'mobile'" />
      <transition name="fade" mode="out-in">
        <router-view class="ViewApp__router-view" />
      </transition>
      <AppNavigationBarMobile v-if="$mq === 'mobile'" />
      <AppFooter v-if="$mq !== 'mobile'" />
    </template>
    <AuthGuard @token-refreshed="onTokenRefreshed" />
  </div>
</template>

<script>
import AppHeader from '@/components/app/AppHeader'
import AppFooter from '@/components/app/AppFooter'
import AppNavigationBarMobile from '@/components/app/AppNavigationBarMobile'
import AuthGuard from '@/components/auth/AuthGuard'

export default {
  components: {
    AppFooter,
    AppHeader,
    AppNavigationBarMobile,
    AuthGuard
  },

  data () {
    return {
      ready: false
    }
  },

  methods: {
    onTokenRefreshed () {
      this.ready = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/colors.scss';
@import '../../assets/scss/vars.scss';

.ViewApp {
  background: #fdfdfd;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: $mobile) {
    padding-top: 10rem;
  }
}

.ViewApp__router-view {
  flex-grow: 1;

  @media screen and (min-width: $mobile) {
    padding: 1rem 3rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity .16s ease-in-out,
              transform .2s cubic-bezier(.25,.87,.39,.99);
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave {
  opacity: 1;
}

.fade-enter {
  transform: translateY(20px) scale(.98);
}

</style>
