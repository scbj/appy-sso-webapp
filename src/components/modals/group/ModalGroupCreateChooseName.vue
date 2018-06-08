<template lang="pug">
ModalForm.ModalGroupCreateChooseName(
  ref='form'
  :model='form'
  :rules='rules'
  :primaryButtonText="$t('button.validate')"
  @validated='formValidated' )
  el-form-item( prop='name' :label="$t('chooseGroupName')" )
    el-input( v-model='form.name' @keyup.enter.native='$refs.form.validate' )
</template>

<script>
import ModalForm from '@/components/modals/ModalForm'
import { cleanWhitespaces } from '@/utils/string-helpers'

export default {
  components: {
    ModalForm
  },

  data () {
    return {
      form: {
        name: ''
      },
      rules: {
        name: [ { trigger: 'blur', validator: this.validateGroupName } ]
      }
    }
  },

  methods: {
    validateGroupName (rule, value, callback) {
      const clean = cleanWhitespaces(value) || ''
      if (clean.length < 1) {
        callback(new Error(this.$t('alert.atLeastOneCharacter')))
      } else if (clean.length > 60) {
        callback(new Error(this.$t('alert.atMostSixtyCharacters')))
      } else {
        callback()
      }
    },

    formValidated () {
      this.$emit('nameChosen', this.form.name)
    }
  }
}
</script>
