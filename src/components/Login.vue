<template lang="pug">
.ay-login(:class="$mq")
  .app-title(v-show="$mq === 'mobile'")
    h1
      | appy
      span.secondary pack
  el-card(v-loading="loading")
    div(slot='header')
      h2(v-text="isLoggedIn ? $t('title.alreadyLogged') : $t('title.login')")
    //- User already connected
    .already-logged(v-if="isLoggedIn")
      p(v-html="$t('message.alreadyLogged')")
      el-button(type='primary' size='big' v-html="buttonContinueAsHtml" @click="continueAs")
      el-button(type='text' size='big' v-text="$t('button.logOut')" @click="logout")
    //- User not connected
    el-form(v-else ref='form' :model='form' :rules='rules'
      label-width='180px' :label-position="$mq === 'mobile' ? 'top' : 'left'"
      status-icon='')
      el-alert(v-show='error' :closable="false" type='error'
        :title="$t('alert.incorrectCredentials')")
      el-form-item(prop='username' :label="$t('username')")
        el-input(type='email' v-model='form.username')
      el-form-item(prop='password' :label="$t('password')")
        el-input(type='password' v-model='form.password' auto-complete='off')
      el-form-item
        el-checkbox(disabled='' :model='form.rememberMe') {{ $t('check.rememberMe') }}
      el-form-item
        el-button(type='primary' v-text="$t('button.logIn')" @click='submit')
        el-button(disabled='' v-text="$t('button.needHelp')")
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

const { mapState, mapGetters } = createNamespacedHelpers('auth')

export default {
  data () {
    return {
      error: false,
      form: {
        username: 'thomas.dubois@digi-smart.fr',
        password: 'secret',
        rememberMe: false
      },
      rules: {
        username: [ { required: true, message: this.$t('alert.username.ask'), trigger: 'blur' } ],
        password: [ { required: true, message: this.$t('alert.password.ask'), trigger: 'blur' } ]
      },
      username: 'John Doe'
    }
  },
  computed: {
    // repatriates the state of the auth module in the computed properties
    ...mapState({
      loading: state => state.pending
    }),
    ...mapGetters([ 'isLoggedIn' ]),

    buttonContinueAsHtml () {
      const username = this.username.length > 10
        ? `${this.username.substring(0, 7)}...`
        : this.username
      return this.$t('button.continueAs', { username })
    }
  },
  methods: {
    /**
     * Try to validate the form, if it's valide start the login process.
     */
    submit () {
      // reset the initial error value
      this.error = false

      // login only if the user has completed the form
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.login()
      })
    },

    /**
     * Log int the use and navigate to the Dashboard.
     */
    async login () {
      const creds = {
        username: this.form.username,
        password: this.form.password
      }
      const success = await this.$store.dispatch('auth/login', creds)
      if (success) this.navigateToDashboard()
      else this.error = true
    },

    /**
     * Log out the user.
     */
    logout () {
      this.$store.dispatch('auth/logout')
    },

    continueAs () {
      // stay connected and redirect the user to the dashboard
      this.navigateToDashboard()
    },

    navigateToDashboard () {
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>

<style lang="scss" scoped>
.ay-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;

  &.mobile {
    height: auto;

    > .el-card {
      width: 100%;
      height: 100%;
      border-radius: 0;
      box-shadow: none;
    }
  }

  > .el-card {
    max-width: 500px
  }
}

.app-title {
  margin: 4rem 0
}

.el-alert {
  margin-bottom: 18px;
}

.already-logged {
  text-align: center;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;

  .el-button {
    display: block;
  }
}

h2 {
  text-align: center;
}
</style>
