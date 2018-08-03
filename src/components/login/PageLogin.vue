<template lang="pug">
.PageLogin( :class="$mq" )
  .app-title( v-show="$mq === 'mobile'" )
    BaseImage.PageLogin__logo( src='/static/img/title-gradient.svg' )
  el-card( v-loading='pending' )
    div( slot='header' )
      h4( v-text='cardHeader' )
    //- User already connected
    LoginContinue( v-if='isLoggedIn' )
    //- User not connected
    LoginForm( v-else ref='form' )
</template>

<i18n>
{
  "en": {
    "title": "Login"
  },
  "fr": {
    "title": "Connexion"
  }
}
</i18n>

<script>
import { get } from 'vuex-pathify'
import LoginForm from '@/components/login/LoginForm'
import LoginContinue from '@/components/login/LoginContinue'

export default {
  components: {
    LoginForm,
    LoginContinue
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
.PageLogin {
  background-image: url(/static/img/low-poly.svg);
  background-size: cover;
  background-position: center;
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
    max-width: 450px;
    box-shadow: 1px 12px 20px 0 rgba(0,0,0,.05);
    border: none;
  }
}

.app-title {
  margin: 4rem 0
}

.PageLogin__logo {
  width: 12rem;
}

h4 {
  text-align: center;
}
</style>
