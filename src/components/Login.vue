<template>
<div class="login">
  <el-card>
    <h1 class="h1" v-text="$t('title')" />
    <el-form ref="form"
             :model="form"
             :rules="rules"
             label-width="180px"
             label-position="left"
             status-icon>
      <el-form-item prop="username" :label="$t('usernameLabel')">
        <el-input type="email" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item prop="password" :label="$t('passwordLabel')">
        <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox disabled :model="form.rememberMe">{{ $t('rememberMe') }}</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"
                   v-text="$t('signInButton')"
                   @click="submit" />
        <el-button disabled v-text="$t('helpButton')" />
      </el-form-item>
    </el-form>
  </el-card>
</div>
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
export default {
  name: 'ay-login',
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
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('YEP')
        } else {
          console.log('oups...')
          return false
        }
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
