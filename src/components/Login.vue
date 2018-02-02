<template lang="pug">
.ay-login
  el-card(v-loading="loading")
    h2(v-text="$t('title.login')")
    el-form(
      ref='form'
      :model='form'
      :rules='rules'
      label-width='180px'
      label-position='left'
      status-icon='')
      el-alert(
        :closable="false"
        :title="$t('alert.incorrectCredentials')"
        type='error'
        v-show='error')
      el-form-item(prop='username' :label="$t('username')")
        el-input(type='email' v-model='form.username')
      el-form-item(prop='password' :label="$t('password')")
        el-input(type='password' v-model='form.password' auto-complete='off')
      el-form-item
        el-checkbox(disabled='' :model='form.rememberMe') {{ $t('check.rememberMe') }}
      el-form-item
        el-button(type='primary' v-text="$t('button.signIn')" @click='submit')
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

const { mapState } = createNamespacedHelpers('auth')

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
      }
    }
  },
  computed: {
    // repatriates the state of the auth module in the computed properties
    ...mapState({
      loading: state => state.pending
    })
  },
  methods: {
    submit () {
      // reset the error initial value
      this.error = false

      // login only if the user has completed the form
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.login()
      })
    },

    async login () {
      const creds = {
        username: this.form.username,
        password: this.form.password
      }
      const success = await this.$store.dispatch('auth/login', creds)
      if (success) this.$router.push('Dashboard')
      else this.error = true
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
}

.el-alert {
  margin-bottom: 18px;
}
</style>
