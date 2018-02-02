<template lang="pug">
.ay-login
  el-card
    h2(v-text="$t('title.login')")
    el-form(
      ref='form'
      :model='form'
      :rules='rules'
      label-width='180px'
      label-position='left'
      status-icon='')
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
import { HTTP, setAuthorizaion } from '@/http-common'

export default {
  data () {
    return {
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
    submit () {
      this.$refs.form.validate((valid) => {
        if (!valid) return false
        this.login()
      })
    },

    login () {
      const data = {
        grant_type: 'password',
        client_id: '1',
        client_secret: 'pegUI3n9Ow30nPCVadaz0SLPiYIhZzzwjiVnVUI9',
        username: this.form.username,
        password: this.form.password
      }
      HTTP.post('oauth/token', data)
        .then(response => {
          const token = response.data.access_token
          setAuthorizaion(token)
          this.$store.dispatch('login', {
            username: this.form.username,
            token
          })
          this.$router.push('dashboard')
        })
        .catch(e => {
          console.log('Oups', e)
        })
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
</style>
