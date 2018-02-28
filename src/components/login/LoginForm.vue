<template lang="pug">
el-form(
  ref='form'
  :model='form'
  :rules='rules'
  label-width='180px'
  :label-position="$mq === 'mobile' ? 'top' : 'left'"
  status-icon)
  el-alert(
    class='alert'
    v-show='error'
    :closable='false'
    :type='errorType'
    :title='error')
  el-form-item( prop='username' :label="$t('username')" )
    el-input(
      type='email'
      v-model='form.username'
      autofocus)
  el-form-item( prop='password' :label="$t('password')" )
    el-input(
      type='password'
      v-model='form.password'
      auto-complete='off'
      @focus.native='$event.target.select()')
  el-form-item
    el-checkbox( disabled :model='form.rememberMe' ) {{ $t('check.rememberMe') }}
  el-form-item
    el-button(
      type='primary'
      v-text="$t('button.logIn')"
      @click='submit')
    el-button( disabled v-text="$t('button.needHelp')" )
</template>

<script>
export default {
  data () {
    return {
      error: '',
      form: {
        username: 'thomas.dubois@digi-smart.fr',
        password: 'secret',
        rememberMe: false
      },
      rules: {
        username: [ { required: true, message: this.$t('alert.username.ask'), trigger: 'blur' } ],
        password: [ { required: true, message: this.$t('alert.password.ask'), trigger: 'blur' } ]
      }
    }
  },

  methods: {
    /**
     * Try to validate the form, if it's valide start the login process.
     */
    submit () {
      // reset the initial error value
      this.error = ''

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
      const login = await this.$store.dispatch('auth/login', creds)

      // check for error
      if (login.status !== 200) {
        return this.handleError(login)
      }

      // login successfully, navigate to the Dashboard
      this.$router.push({ name: 'dashboard' })
    },
    /**
     * Defines the message and type of error for the alert component.
     */
    handleError ({ error, status }) {
      this.error = status === 401
        ? this.$t('alert.incorrectCredentials')
        : this.$t('alert.networkError')
      this.errorType = status === 401
        ? 'error'
        : 'warning'
      console.debug(error)
    }
  }
}
</script>

<style lang="scss" scoped>
.alert {
  margin-bottom: 18px;
}
</style>
