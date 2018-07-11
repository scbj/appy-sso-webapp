<template lang="pug">
.ModalGroupRename
  h2.ModalGroupRename__title {{ $t('title.renameGroup') }}
  ModalForm(
    v-loading='pending'
    ref='form'
    :model='form'
    :rules='rules'
    :primaryButtonText="$t('button.rename')"
    :primaryButtonDisabled='activeGroupName === form.name'
    @validated='renameGroup' )
    el-form-item( prop='name' :label="$t('chooseGroupName')" )
      el-input( v-model='form.name' @keyup.enter.native='$refs.form.validate' )
</template>

<script>
import { get } from 'vuex-pathify'

import ModalForm from '@/hold-components/modals/ModalForm'
import { buildMessage } from '@/hold-components/message'
import validator from '@/validators/validator'

export default {
  components: {
    ModalForm
  },

  computed: {
    activeGroup: get('dashboard/groups/activeGroup'),

    activeGroupName () {
      return this.activeGroup.name
    }
  },

  data () {
    return {
      pending: false,
      form: {
        name: this.activeGroupName
      },
      rules: {
        name: [{
          trigger: 'blur',
          validator: this.validateGroupName
        }]
      }
    }
  },

  mounted () {
    this.form.name = this.activeGroupName
  },

  methods: {
    validateGroupName (rule, value, callback) {
      // The user must be informed if the name has not changed
      if (this.activeGroupName === this.form.name) {
        const error = new Error(this.$t('error.groupNameUnchanged'))
        return callback(error)
      }
      const { success, error } = validator.group.name.validate(value)
      callback(success ? undefined : error)
    },

    async renameGroup () {
      this.pending = true

      const success = await this.$store.dispatch('group/rename', {
        groupId: this.activeGroup.id,
        name: this.form.name
      })

      // We must inform the user if the operation failed
      this.notifyUser(success)

      this.$store.dispatch('modal/close')
      this.$store.dispatch('dashboard/groups/list')
    },

    notifyUser (success) {
      if (success) return
      const message = buildMessage('groupRenameError')
      this.$message(message)
    }
  }
}
</script>

<style lang="scss" scoped>
.ModalGroupRename__title {
  font-size: 2rem;
  font-weight: 600;
  color: #373737;
  margin-bottom: 1rem;
}
</style>
