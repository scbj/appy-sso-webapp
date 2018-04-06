<template lang="pug">
ActivateLicenceBaseStep(
  :title="$t('title.licenceKey')",
  :button="$t('button.validate')"
  @next='next'
)
  .input( ref='input' )
    input(
      spellcheck='false'
      v-model='licenceKey'
      @input='onInput'
      @keypress='onKeypress' )
    span.placeholder {{ placeholder }}
  span.message.error( v-show='hasError' ) {{ $t('alert.invalidLicenceKey') }}
</template>

<script>
import ActivateLicenceBaseStep from './ActivateLicenceBaseStep'
import { licenceMask } from '@/utils/masks'

export default {
  components: {
    ActivateLicenceBaseStep
  },

  data () {
    return {
      licenceKey: '',
      placeholder: '',
      hasError: false
    }
  },

  watch: {
    licenceKey: {
      immediate: true,
      handler (newLicence) {
        const length = newLicence.length
        const defaultPlaceholder = 'XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX'
        this.placeholder = ' '.repeat(length) + defaultPlaceholder.substr(length)
      }
    }
  },

  methods: {
    onKeypress (e) {
      // Manually handle keypress ⌨
      e.preventDefault()
      const char = String.fromCharCode(e.keyCode)
      const licence = licenceMask(this.licenceKey + char)
      this.licenceKey = licence
    },

    onInput (e) {
      const licence = licenceMask(e.target.value)
      this.licenceKey = licence
    },

    next () {
      this.hasError = this.licenceKey.length < 36
      if (this.hasError === false) {
        this.$emit('next')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.input {
  --input-padding-horizontal: 3rem;
  --text-color: #707070;
  position: relative;
  margin-bottom: 1.2rem;

  input,
  .placeholder {
    font-family: "consolas";
    font-size: 1.8rem;
    letter-spacing: .3em;
  }

  input {
    width: 34.2em;
    color: var(--text-color);
    padding: 1.2rem var(--input-padding-horizontal);
    border: 1px solid #E4E4E4;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: 0 3px 14px -1px rgba(#393939, 0.1);
    transition: box-shadow .1s ease-in-out;

    &:focus, &:active {
      outline: none;
      box-shadow: 0 3px 14px -1px rgba(#393939, 0.2);
    }
  }

  .placeholder {
    pointer-events: none;
    user-select: none;
    white-space: pre;
    opacity: .2;
    color: var(--text-color);
    position: absolute;
    top: 50%;
    left: var(--input-padding-horizontal);
    transform: translateY(-50%);
  }

}

.message.error {
  color: #C70F0F;
  font-size: 1.33rem;
  font-weight: 600;
}
</style>
