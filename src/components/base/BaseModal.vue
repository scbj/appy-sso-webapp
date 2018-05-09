<template lang="pug">
.base-modal.modal-backdrop( v-show='open' @click='close' )
  .modal-container( @click.stop='' )
    slot
</template>

<script>
export default {
  name: 'BaseModal',

  props: {
    open: {
      type: Boolean,
      required: true
    }
  },

  watch: {
    open: {
      immediate: true,
      handler: 'changeScrollBehavior'
    }
  },

  mounted () {
    document.addEventListener('keydown', this.handleEscapeKey)
  },

  beforeDestroy () {
    document.removeEventListener('keydown', this.handleEscapeKey)
  },

  methods: {
    /** @param {KeyboardEvent} e */
    handleEscapeKey (e) {
      if (this.open && e.keyCode === 27) {
        this.close()
      }
    },

    close () {
      this.$emit('close')
    },

    changeScrollBehavior (shouldDisable) {
      const action = shouldDisable
        ? 'disable'
        : 'enable'
      this.$store.dispatch(`ui/${action}Scroll`)
    }
  }
}
</script>

<style lang="scss" scoped>
.base-modal.modal-backdrop {
  z-index: 9998;
  background-color: rgba(white, .7);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  background: white;
  padding: 2rem;
  border-radius: 6px;
  box-shadow: 0 6px 22px -2px rgba(black, .1);
}
</style>
