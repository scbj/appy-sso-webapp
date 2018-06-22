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
import validator from '@/validators/validator'

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
      const { success, error } = validator.group.name.validate(value)
      callback(success ? undefined : error)
    },

    formValidated () {
      this.$emit('nameChosen', this.form.name)
    }
  }
}
</script>
