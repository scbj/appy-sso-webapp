z<template lang="pug">
.ModalUserCreate
  h2.ModalUserCreate__title {{ $t('title.createUsers') }}
  p.ModalUserCreate__infos {{ $t('description.emailList') }}
  ModalForm(
    v-loading='pending'
    :model='form'
    :rules='rules'
    :primaryButtonText="primaryButtonText"
    @validated='createUsers'  )
    el-form-item( prop='text' :label="$t('label.emailList')" )
      el-input(
        v-model='form.text'
        :autosize="{ minRows: 4, maxRows: 7}"
        type='textarea' )
</template>

<script>
import ModalForm from '@/hold-components/modals/ModalForm'
import { buildMessage } from '@/hold-components/message'
import validator from '@/validators/validator'

export default {
  components: {
    ModalForm
  },

  computed: {
    emails () {
      return this.form.text
        ? this.form.text.trim().split(/(?:;| |\n)+/)
        : []
    },

    primaryButtonText () {
      const count = this.emails.length || 1
      return this.$tc('button.createUsers', count, { count })
    }
  },

  data () {
    return {
      pending: false,
      form: {
        text: ''
      },
      rules: {
        text: [{
          trigger: 'blue',
          validator: this.validateEmails
        }]
      }
    }
  },

  methods: {
    validateEmails (rule, value, callback) {
      /**
       * Invalidate the form.
       * @param {String} resourceName
       */
      const failed = (resourceName, values) => {
        // We must recover the message corresponding to the error
        const message = this.$t(`error.${resourceName}`, values)
        const error = new Error(message)

        // And send it in the callback to indicate that validation failed
        callback(error)
      }

      if (this.emails.length === 0) {
        return failed('noEmailAddressFilled')
      }
      for (const email of this.emails) {
        const { success } = validator.user.email.validate(email)
        if (!success) {
          return failed('unknowEmailFormat', { email })
        }
      }

      // Everything went well, so the form is valid
      callback()
    },

    async createUsers () {
      this.pending = true

      const success = await this.$store.dispatch('user/createMultiple', {
        emails: this.emails
      })

      this.notifyUser(success)

      this.$store.dispatch('modal/close')
    },

    notifyUser (success) {
      const message = buildMessage(success
        ? 'userCreateSuccess'
        : 'userCreateError')
      this.$message(message)
    }
  }
}
</script>

<style lang="scss" scoped>
.ModalUserCreate__title {
  font-size: 2rem;
  font-weight: 600;
  color: #373737;
  margin-bottom: 1rem;
}

.ModalUserCreate__infos {
  font-style: italic;
  margin-bottom: 1em;
}
</style>
