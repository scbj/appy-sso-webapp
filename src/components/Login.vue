<template lang="pug">
.login
  el-card
    h1.h1(v-text="$t('title')")
    el-form(
      ref='form'
      :model='form'
      :rules='rules'
      label-width='180px'
      label-position='left'
      status-icon='')
      el-form-item(prop='username' :label="$t('usernameLabel')")
        el-input(type='email' v-model='form.username')
      el-form-item(prop='password' :label="$t('passwordLabel')")
        el-input(type='password' v-model='form.password' auto-complete='off')
      el-form-item
        el-checkbox(disabled='' :model='form.rememberMe') {{ $t('rememberMe') }}
      el-form-item
        el-button(type='primary' v-text="$t('signInButton')" @click='submit')
        el-button(disabled='' v-text="$t('helpButton')")
</template>

<i18n>
{
  "en": {
    "title": "Login",
    "usernameLabel": "Username",
    "passwordLabel": "Password",
    "rememberMe": "Remember me",
    "signInButton": "Sign in",
    "helpButton": "Need help ?"
  },
  "fr": {
    "title": "Connexion",
    "usernameLabel": "Nom d'utilisateur",
    "passwordLabel": "Mot de passe",
    "rememberMe": "Se souvenir de moi",
    "signInButton": "Se connecter",
    "helpButton": "Besoin d'aide ?"
  }
}
</i18n>

<script>
import { HTTP, setAuthorizaion } from '@/http-common'

export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        rememberMe: false
      },
      rules: {
        username: [ { required: true, message: this.$t('alert.username'), trigger: 'blur' } ],
        password: [ { required: true, message: this.$t('alert.password'), trigger: 'blur' } ]
      }
    }
  },
  methods: {
    submit () {
      const data = {
        grant_type: 'password',
        client_id: '1',
        client_secret: 'pegUI3n9Ow30nPCVadaz0SLPiYIhZzzwjiVnVUI9',
        username: 'thomas.dubois@digi-smart.fr',
        password: 'secret'
      }
      HTTP.post('oauth/token', data)
        .then(response => {
          setAuthorizaion(response.data.access_token)
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
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
