<template lang="pug">
.base-image
  transition( name='fade' )
    img.image( v-if='loaded' :src='source' )
    .loader( v-else )
</template>

<script>
export default {
  props: {
    src: {
      type: String | null | undefined,
      required: true
    },
    fallbackSrc: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      loaded: false,
      source: ''
    }
  },

  watch: {
    src: {
      immediate: true,
      handler (src) {
        const image = new Image()
        image.onload = () => {
          this.source = src
          this.loaded = true
        }
        image.src = src
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.base-image {
  --color1: #eeeeee;
  --color2: #e6e6e6;
  position: relative;
}

.image {
  width: 100%;
  height: 100%;
}

.loader {
  background: linear-gradient(
    to right,
    var(--color1) 0%,
    var(--color1) 35%,
    var(--color2) 50%,
    var(--color1) 65%,
    var(--color1) 100%
  );
  background-size: 300% 100%;
  background-position-x: 100%;
  // position
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: Gradient 1.3s ease infinite;
}

@keyframes Gradient {
  0% {
    background-position-x: 100%
  }
  100% {
    background-position-x: 0%
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
