<template>
  <div
    v-if="!source"
    :class="{ loading }"
    class="BaseImage_no-source" />
  <img
    v-else
    :src="source"
    class="BaseImage">
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

  data () {
    return {
      source: '',
      isFallback: false
    }
  },

  computed: {
    loading () {
      return this.source === ''
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
  $color: #eeeeee;
  background: linear-gradient(
    to right,
    $color 0%,
    $color 35%,
    darken($color, 3%) 50%,
    $color 65%,
    $color 100%
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
