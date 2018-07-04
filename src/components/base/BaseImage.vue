<template lang="pug">
.BaseImage_no-source( v-if='!source' :class='{ loading }' )
img.BaseImage( v-else :src='source' )
</template>

<script>
/**
 * @param {String} src
 * @returns {Promise<Boolean>}
 */
function isImageAvailable (src) {
  return new Promise(resolve => {
    if (!src) {
      return resolve(false)
    }
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

  computed: {
    loading () {
      return this.source === ''
    }
  },

  data () {
    return {
      source: '',
      isFallback: false
    }
  },

  watch: {
    src: {
      immediate: true,
      async handler (src) {
        this.source = ''
        const available = await getAvailableSource(src, this.fallbackSrc)
        if (!available) {
          return
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
        this.source = ''
        const available = await isImageAvailable(src)
        if (!available) {
          return this.resetSource()
        }
        this.source = available
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.BaseImage_no-source {
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
    animation: gradient 1.3s ease infinite;
  }
}

@keyframes gradient {
  0% {
    background-position-x: 100%
  }
  100% {
    background-position-x: 0%
  }
}
</style>
