<template lang="pug">
.BaseModal( v-if='opened' @click='close' )
  .BaseModal__container( @click.stop='' class='{ opened }' )
    slot
</template>

<script>
export default {
  name: 'BaseModal',

  props: {
    opened: {
      type: Boolean,
      required: true
    }
  },

  watch: {
    opened: {
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
      if (this.opened && e.keyCode === 27) {
        this.close()
      }
    },

    close () {
      this.$emit('closed')
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
  z-index: $z-index-modal;
  background-color: rgba(black, .2);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: test .2s ease-in-out forwards;

  @keyframes test {
    0% { backdrop-filter: blur(0) }
    100% { backdrop-filter: blur(10px) }
  }
}

.BaseModal__container {
  background: white;
  padding: 2rem;
  width: 100%;
  height: 100%;

  @media screen and (min-width: $mobile) {
    opacity: 0;
    width: 460px;
    height: auto;
    border-radius: 6px;
    box-shadow: 0 6px 22px -2px rgba(black, .1);

    &.opened {
      animation: slide-up .4s cubic-bezier(.25,.87,.39,.99) forwards;

      @keyframes slide-up {
        0% {
          opacity: 0;
          transform: translateY(50px) scale(1.1);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
    }
  }

  > .title {
    font-size: 2rem;
    font-weight: 600;
    color: #373737;
    margin-bottom: 1rem;
  }
}
</style>
