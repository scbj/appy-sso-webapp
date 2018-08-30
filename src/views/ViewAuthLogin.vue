<template>
  <div :class="$mq" class="ViewAuthLogin">
    <AppLogo v-show="$mq === 'mobile'" class="ViewAuthLogin__logo" />
    <BaseCard v-loading="pending" class="ViewAuthLogin__container">
      <h4 class="ViewAuthLogin__title">{{ cardHeader }}</h4>

      <!-- User already connected -->
      <AuthLoginContinue v-if="isLoggedIn"/>

      <!-- User not connected -->
      <AuthLoginForm v-else ref="form"/>
    </BaseCard>
    <BaseLanguageSwitch />
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

import AppLogo from '@/components/app/AppLogo'
import AuthLoginForm from '@/components/auth/AuthLoginForm'
import AuthLoginContinue from '@/components/auth/AuthLoginContinue'

export default {
  components: {
    AppLogo,
    AuthLoginForm,
    AuthLoginContinue
  },

  computed: {
    pending: get('auth/pending'),
    isLoggedIn: get('auth/isLoggedIn'),

    cardHeader () {
      return this.isLoggedIn
        ? this.$t('title.alreadyLogged')
        : this.$t('title.login')
    }
  }
}
</script>

<style lang="scss" scoped>
.ViewAuthLogin {
  background: linear-gradient(rgba(black, .01), rgba(black, .05));
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;

  &.mobile {
    background: white;
    justify-content: flex-start;
    height: auto;

    > .ViewAuthLogin__container {
      max-width: 100%;
      margin: 0;
      height: 100%;
      border-radius: 0;
      border: none;
      box-shadow: none;
    }
  }
}

.ViewAuthLogin__container {
  width: 100%;
  max-width: 500px;
}

.ViewAuthLogin__logo {
  width: 12rem;
  margin: 4rem 0
}

.ViewAuthLogin__title {
  text-align: center;
  margin-bottom: 2em;
}

.BaseLanguageSwitch {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 2rem;
}
</style>
