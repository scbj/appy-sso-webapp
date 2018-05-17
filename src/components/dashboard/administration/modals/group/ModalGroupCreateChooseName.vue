<template lang="pug">
el-form.modal-group-create-choose-name(
  @submit.native.prevent=''
  ref='form'
  :model='form'
  :rules='rules' status-icon )
  el-form-item( prop='name' label='Nom du groupe' )
    el-input( v-model='form.name' @keyup.enter.native='validate' )
  el-form-item.buttons
    el-button( type='text' @click="$emit('requestClose')" ) Annuler
    el-button( type='primary' @click='validate' ) Valider
</template>

<script>
import { cleanWhitespaces } from '@/utils/string-helpers'

function validateGroupName (rule, value, callback) {
  const clean = cleanWhitespaces(value) || ''
  if (clean.length < 1) {
    callback(new Error('Doit contenir au moins 1 caractère'))
  } else if (clean.length > 60) {
    callback(new Error('Ne doit pas dépasser 60 caractères'))
  } else {
    callback()
  }
}

export default {
  data () {
    return {
      form: {
        name: ''
      },
      rules: {
        name: [ { trigger: 'blur', validator: validateGroupName } ]
      }
    }
  },

  methods: {
    validate (e) {
      this.$refs.form.validate(valid => {
        if (!valid) return false
        this.$emit('nameChosen', this.form.name)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.buttons {
  margin-top: 2rem;
  margin-bottom: 0;
  text-align: right;

  button {
    margin-bottom: 10px;
  }
}
</style>
