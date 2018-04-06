<template lang="pug">
ActivateLicenceBaseStep.activate-licence-key(
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
@import '../../assets/scss/activate-licence.scss';

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
  }

  .placeholder {
    pointer-events: none;
    user-select: none;
    white-space: pre;
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
