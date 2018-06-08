<template lang="pug">
el-form.ModalForm(
  ref='elForm',
  :model='model'
  :rules='rules'
  status-icon
  @submit.native.prevent='' )
  slot
  el-form-item.ModalForm__buttons
    el-button( v-if='canCancel' type='text' @click='closeModal' ) {{ $t('cancel') }}
    el-button( type='primary' @click='validate' ) {{ primaryButtonText }}
</template>

<script>
export default {
  props: {
    primaryButtonText: {
      type: String,
      required: true
    },
    model: {
      type: Object,
      default: undefined
    },
    rules: {
      type: Object,
      default: undefined
    },
    canCancel: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    closeModal () {
      this.$store.dispatch('modal/close')
    },

    async validate () {
      try {
        await this.$refs.elForm.validate()

        // The parent must be informed that validation has been successful
        this.$emit('validated')
      } catch (_) {
        console.debug('Validation failed...')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ModalForm__buttons {
  margin-top: 2rem;
  margin-bottom: 0;
  text-align: right;
}

.ModalForm__buttons,
.ModalForm__buttons button {
  margin-bottom: 0;
}
</style>
