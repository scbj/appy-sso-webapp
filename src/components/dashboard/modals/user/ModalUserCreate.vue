<template>
  <div class="ModalUserCreate">
    <h2 class="ModalUserCreate__title">{{ $t('title.createUsers') }}</h2>
    <p class="ModalUserCreate__infos">{{ $t('description.emailList') }}</p>
    <ModalForm
      v-loading="pending"
      :model="form"
      :rules="rules"
      :primary-button-text="primaryButtonText"
      @validated="createUsers">
      <el-form-item :label="$t('label.emailList')" prop="text">
        <el-input
          v-model="form.text"
          :autosize="{ minRows: 4, maxRows: 7}"
          type="textarea"/>
      </el-form-item>
      <el-form-item
        v-if="groups.length"
        :label="$t('label.associatedGroup')"
        prop="group">
        <el-select v-model="form.groupId" placeholder="Choissiez un groupe">
          <el-option
            v-if="defaultGroup"
            :value="defaultGroup.id"
            :label="$t('byDefault')" />
          <el-option
            v-for="group in groups"
            :key="group.id"
            :value="group.id"
            :label="group.name" />
        </el-select>
      </el-form-item>
    </ModalForm>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

import ModalForm from '@/components/dashboard/modals/ModalForm'
import { buildMessage } from '@/utils/message'
import validator from '@/utils/validators/validator'

export default {
  components: {
    ModalForm
  },

  data () {
    return {
      pending: false,
      form: {
        text: '',
        groupId: -1
      },
      rules: {
        text: [{
          trigger: 'blue',
          validator: this.validateEmails
        }],
        group: [{
          trigger: 'blue',
          validator: this.validateGroupId
        }]
      }
    }
  },

  computed: {
    groups: get('group/all'),
    defaultGroup: get('group/defaultGroup'),

    emails () {
      return this.form.text
        ? this.form.text.trim().split(/(?:;| |\n)+/).filter(x => x)
        : []
    },

    primaryButtonText () {
      const count = this.emails.length || 1
      return this.$tc('button.createUsers', count, { count })
    }
  },

  async mounted () {
    this.pending = true

    await this.$store.dispatch('group/list')
    this.form.groupId = this.defaultGroup.id

    this.pending = false
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

    validateGroupId (rule, value, callback) {
      if (value === -1) {
        return callback(new Error('Oups oups oups'))
      }
      callback()
    },

    async createUsers () {
      this.pending = true

      const success = await this.$store.dispatch('ui/dashboard/users/create', {
        emails: this.emails,
        groupId: this.form.groupId
      })

      this.notifyUser(success)
      this.pending = false

      if (success) {
        this.$store.dispatch('ui/modal/close')
      }
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
