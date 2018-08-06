<template>
  <el-form
    :rules="rules"
    :model="model"
    @submit.native.prevent
    ref="elForm"
    class="ModalForm"
    status-icon="status-icon">
    <slot/>
    <el-form-item class="ModalForm__buttons">
      <BaseButton
        v-if="canCancel"
        @click="closeModal"
        type="secondary">
        {{ $t('cancel') }}
      </BaseButton>
      <BaseButton @click="validate" :disabled="primaryButtonDisabled">
        {{ primaryButtonText }}
      </BaseButton>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  props: {
    primaryButtonText: {
      type: String,
      required: true
    },
    primaryButtonDisabled: {
      type: Boolean,
      default: false
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
      this.$store.dispatch('ui/modal/close')
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
