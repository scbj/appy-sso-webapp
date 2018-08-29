<template>
  <el-form
    ref="elForm"
    :rules="rules"
    :model="model"
    class="ModalForm"
    status-icon="status-icon"
    @submit.native.prevent>
    <slot/>
    <el-form-item class="ModalForm__buttons">
      <BaseButton
        v-if="canCancel"
        type="secondary"
        @click="closeModal">
        {{ $t('cancel') }}
      </BaseButton>
      <BaseButton :disabled="primaryButtonDisabled" @click="validate">
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
        if (this.model) {
          await this.$refs.elForm.validate()
        }

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
