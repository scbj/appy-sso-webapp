<template lang="pug">
ActivateLicenceBaseStep.activate-licence-key(
  :title="$t('title.licenceKey')",
  :button="$t('button.validate')"
  @next='next' )
  .input( ref='input' )
    input(
      spellcheck='false'
      v-model='licenceKey'
      @input='onInput'
      @keyup.enter="next"
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

  mounted () {
    this.licenceKey = this.$store.state.licence.key
  },

  methods: {
    onKeypress (e) {
      // Manually handle keypress ⌨
      e.preventDefault()
      const char = String.fromCharCode(e.keyCode || e.charCode)
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
        const step = this.$route.meta.step
        this.$store.dispatch('licence/updateKey', { key: this.licenceKey })
        this.$store.dispatch('licence/completeStep', { step })
        this.$router.push({ name: 'activateCompany' })
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
    user-select: none;
    pointer-events: none;
    white-space: pre;
    position: absolute;
    top: 50%;
    left: var(--input-padding-horizontal);
    transform: translateY(-50%);
  }

}
</style>
