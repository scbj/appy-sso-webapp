<template lang="pug">
.BaseModal( v-if='open' @click='close' )
  .BaseModal__container( @click.stop='' )
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
@import '../../assets/scss/vars.scss';

.BaseModal {
  z-index: 9998;
  background-color: rgba(black, .2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.BaseModal__container {
  background: white;
  padding: 2rem;
  width: 100%;
  height: 100%;

  @media screen and (min-width: $mobile) {
    width: 460px;
    height: auto;
    border-radius: 6px;
    box-shadow: 0 6px 22px -2px rgba(black, .1);
  }

  > .title {
    font-size: 2rem;
    font-weight: 600;
    color: #373737;
    margin-bottom: 1rem;
  }
}
</style>
