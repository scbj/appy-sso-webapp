<template lang="pug">
.placeholder( v-if='!source' :class='{ loading }' )
img.image( v-else :src='source' )
</template>

<script>
/**
 * @param {String} src
 * @returns {Promise<Boolean>}
 */
function isImageAvailable (src) {
  return new Promise(resolve => {
    const image = new Image()
    image.onload = () => resolve(true)
    image.onerror = () => resolve(false)
    image.src = src
  })
}

/**
 * @param {Array<String>} sources
 * @returns {String|null}
*/
async function getAvailableSource (...sources) {
  // remove duplicates
  sources = Array.from(new Set(sources))
  for (const source of sources) {
    if (await isImageAvailable(source)) {
      return source
    }
  }

  return null
}

export default {
  name: 'BaseImage',
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
      loading: true,
      source: '',
      isFallback: false
    }
  },

  watch: {
    src: {
      immediate: true,
      async handler (src) {
        const available = await getAvailableSource(src, this.fallbackSrc)
        if (!available) {
          return this.resetSource()
        }
        this.source = available
        this.isFallback =
          available === this.fallbackSrc &&
          available !== src
      }
    },
    fallbackSrc: {
      async handler (src) {
        if (!this.isFallback) return
        const available = await isImageAvailable(src)
        if (!available) {
          return this.resetSource()
        }
        this.source = available
      }
    }
  },

  methods: {
    resetSource () {
      this.source = ''
      this.isFallback = false
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.placeholder {
  --color1: #eeeeee;
  --color2: #e6e6e6;
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

  &.loading {
    animation: Gradient 1.3s ease infinite;
  }
}

@keyframes Gradient {
  0% {
    background-position-x: 100%
  }
  100% {
    background-position-x: 0%
  }
}
</style>
