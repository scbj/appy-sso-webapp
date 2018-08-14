<template lang="pug">
transition( name='isolement' @after-leave="afterLeave" )
  .TheModal( v-show='opened' @click='handleOutsideClick' )
    transition( name='landing' )
      .TheModal__container( v-show='opened' @click.stop='' )
        component( :is='content' v-bind="componentProps" )
</template>

<script>
import { get, sync } from 'vuex-pathify'

export default {
  computed: {
    opened: sync('ui/modal/opened'),
    content: sync('ui/modal/content'),
    componentProps: get('ui/modal/params'),
    easyCloseEnabled: get('ui/modal/easyCloseEnabled')
  },

  mounted () {
    // We must handle the keydown event when
    // the user wants to leave the dialog box.
    document.addEventListener('keydown', this.handleEscapeKey)
  },

  beforeDestroy () {
    // We need to release the handle of the keydown event
    document.removeEventListener('keydown', this.handleEscapeKey)
  },

  methods: {
    /**
     * Closes the modal when the escape key is pressed.
     * @param {KeyboardEvent} e
     */
    handleEscapeKey (e) {
      const isEscapeKey = () => e.keyCode === 27
      if (this.opened && isEscapeKey()) {
        this.opened = false
      }
    },

    handleOutsideClick () {
      // We should close the modal if easy close it's enabled
      if (this.easyCloseEnabled) {
        this.opened = false
      }
    },

    afterLeave () {
      // Clear content component
      this.content = null
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/vars.scss';
@import '../assets/scss/mixins.scss';

$background-color: rgba(black, .2);
$enter-background-color: rgba(black, 0);
$content-background-color: white;

.TheModal {
  z-index: $z-index-modal;
  background-color: $background-color;
  // backdrop-filter: blur(2px);
  @include flex-center;
  position: fixed;
  top: 0;
  left: 0;
  @include size(100vw, 100vh);
  overflow: hidden;
}

.TheModal__container {
  background: $content-background-color;
  padding: 2rem;
  opacity: 1;
  max-height: 85vh;
  @include size(100%, 100%);
  transform: translateY(0) scale(1);
  overflow-y: auto;

  @media screen and (min-width: $mobile) {
    border-radius: 6px;
    @include size(460px, auto);
    box-shadow: 0 6px 18px -2px rgba(black, .13);
  }
}

.isolement-enter-active {
  transition: all .2s ease-in-out
}

.landing-enter-active {
  transition: all .4s cubic-bezier(.25,.87,.39,.99) .18s,
              opacity .15s ease-in-out .18s
}

.isolement-leave-active {
  transition: background .5s ease-out
}

.landing-leave-active {
  transition: all .16s ease-out
}

.isolement-enter,
.isolement-leave-to {
  background: $enter-background-color;
  // backdrop-filter: blur(0);
}

.landing-enter {
  opacity: 0;
  transform: translateY(50px) scale(1.1);

  @media screen and (min-width: $mobile) {
    box-shadow: 0 20px 60px 0px rgba(black, .13);
  }
}

.landing-leave-to {
  opacity: 0;
  transform: scale(1.1);
}
</style>
