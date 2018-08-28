<template>
  <el-form
    ref="form"
    :model="form"
    :rules="rules"
    :label-position="$mq === 'mobile' ? 'top' : 'left'"
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
    <el-form-item>
      <el-checkbox :model="form.rememberMe" disabled="disabled">
        {{ $t('check.rememberMe') }}
      </el-checkbox>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submit"
        v-text="$t('button.logIn')"/>
      <el-button disabled="disabled" v-text="$t('button.needHelp')"/>
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
</style>
