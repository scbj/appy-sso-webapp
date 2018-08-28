<template>
  <div :class="$mq" class="ViewAuthLogin">
    <div v-show="$mq === 'mobile'" class="app-title">
      <AppLogo class="ViewAuthLogin__logo" />
    </div>
    <el-card v-loading="pending">
      <div slot="header">
        <h4 v-text="cardHeader"/>
      </div>

      <!-- User already connected -->
      <AuthLoginContinue v-if="isLoggedIn"/>

      <!-- User not connected -->
      <AuthLoginForm v-else ref="form"/>
    </el-card>
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
    height: auto;

    > .el-card {
      width: 100%;
      max-width: 100%;
      height: 100%;
      border-radius: 0;
      box-shadow: none;
    }
  }

  > .el-card {
    max-width: 500px;
    box-shadow: 1px 12px 20px 0 rgba(0,0,0,.05);
    border: none;
  }
}

.app-title {
  margin: 4rem 0
}

.ViewAuthLogin__logo {
  width: 12rem;
}

h4 {
  text-align: center;
}

.BaseLanguageSwitch {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 2rem;
}
</style>
