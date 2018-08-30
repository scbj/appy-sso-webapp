<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    class="AuthLoginForm"
    label-position="top"
    label-width="180px"
    status-icon="status-icon">
    <el-alert
      v-show="error"
      :closable="false"
      :type="errorType"
      :title="error"
      class="alert"/>
    <el-form-item :label="$t('username')" prop="username">
      <el-input
        v-model="form.username"
        type="email"
        autofocus="autofocus"/>
    </el-form-item>
    <el-form-item :label="$t('password')" prop="password">
      <el-input
        v-model="form.password"
        type="password"
        auto-complete="off"
        @focus.native="$event.target.select()"
        @keyup.enter.native="submit"/>
    </el-form-item>
    <el-form-item class="AuthLoginForm__buttons">
      <BaseButton type="secondary" @click.prevent>{{ $t('button.needHelp') }}</BaseButton>
      <BaseButton @click.prevent="submit">{{ $t('button.logIn') }}</BaseButton>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      error: '',
      errorType: '',
      form: {
        username: 'simeon.hoeger@example.com',
        password: 'secret'
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
      const credentials = {
        username: this.form.username,
        password: this.form.password
      }
      const { status } = await this.$store.dispatch('auth/login', credentials)

      // check for error
      if (status !== 200) {
        return this.handleError(status)
      }

      // login successfully, navigate to the Dashboard
      this.$router.push({ name: 'home' })
    },
    /**
     * Defines the message and type of error for the alert component.
     */
    handleError (statusCode) {
      this.error = status === 401
        ? this.$t('alert.incorrectCredentials')
        : this.$t('alert.networkError')
      this.errorType = status === 401
        ? 'error'
        : 'warning'
    }
  }
}
</script>

<style lang="scss" scoped>
.alert {
  margin-bottom: 18px;
}

.AuthLoginForm__buttons {
  margin-bottom: 0;
  margin-top: 4rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}
</style>
