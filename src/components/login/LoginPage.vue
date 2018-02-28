<template lang="pug">
.login-page( :class="$mq" )
  .app-title( v-show="$mq === 'mobile'" )
    h1
      | appy
      span.secondary pack
  el-card( v-loading='loading' )
    div( slot='header' )
      h2( v-text='cardHeader' )
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
import { createNamespacedHelpers } from 'vuex'
import LoginForm from './LoginForm'
import LoginContinue from './LoginContinue'

const { mapState, mapGetters } = createNamespacedHelpers('auth')

export default {
  components: {
    LoginForm,
    LoginContinue
  },

  computed: {
    // repatriates the state and getters of the auth module in the computed properties
    ...mapState({
      loading: state => state.pending
    }),
    ...mapGetters([
      'isLoggedIn'
    ]),
    cardHeader () {
      return this.isLoggedIn
        ? this.$t('title.alreadyLogged')
        : this.$t('title.login')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page {
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

h2 {
  text-align: center;
}
</style>
