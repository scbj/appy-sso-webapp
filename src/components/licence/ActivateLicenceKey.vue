<template lang="pug">
ActivateLicenceBaseStep.ActivateLicenceKey(
  :title="$t('title.licenceKey')",
  :button="$t('button.validate')"
  @next='next'
  :pending='pending' )
  .input( ref='input' )
    input(
      spellcheck='false'
      v-model='licenceKey'
      @input='onInput'
      @keyup.enter="next"
      @keypress='onKeypress'
      autofocus )
    span.placeholder {{ placeholder }}
  span.message.error( v-show='hasError' ) {{ $t('alert.invalidLicenceKey') }}
</template>

<script>
import ActivateLicenceBaseStep from './ActivateLicenceBaseStep'
import { licenceMask } from '@/utils/masks'
import delay from '@/utils/delay'

export default {
  components: {
    ActivateLicenceBaseStep
  },

  data () {
    return {
      licenceKey: this.$store.get('ui/licence/key'),
      placeholder: '',
      hasError: false,
      pending: false
    }
  },

  computed: {
    keyLengthTooSmall () {
      return this.licenceKey.length < 36
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

  created () {
    this.$store.set('ui/licence/currentStep', 1)
  },

  methods: {
    onKeypress (e) {
      // Manually handle keypress behavior ⌨
      e.preventDefault()
      const char = String.fromCharCode(e.keyCode || e.charCode)
      const licence = licenceMask(this.licenceKey + char)
      this.licenceKey = licence
    },

    onInput (e) {
      const licence = licenceMask(e.target.value)
      this.licenceKey = licence
    },

    async next () {
      this.hasError = false

      if (this.keyLengthTooSmall) {
        return (this.hasError = true)
      }

      await this.validateKey()
        ? this.completeStep()
        : this.hasError = true
    },

    /** @returns {Promise<Boolean>} */
    async validateKey () {
      this.pending = true

      // Start the asynchronous task to wait for it later
      const request = this.$store.dispatch('ui/licence/validate', {
        key: this.licenceKey
      })

      // We must wait at least 1000 milliseconds for the change
      // of state of the button so that it is not too fast (abrupt).
      await delay(1000)

      // Wait for the result of the task and
      // complete the step if the answer is correct.
      const { status } = await request
      this.pending = false
      return status === 200
    },

    completeStep () {
      const step = this.$route.meta.step
      this.$store.set('ui/licence/key', this.licenceKey)
      this.$store.dispatch('ui/licence/completeStep', { step })

      this.$router.push({ name: 'activateLicenceCompany' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/activate-licence.scss';

$input-padding-horizontal: 3rem;

.input {
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
    left: $input-padding-horizontal;
    transform: translateY(-50%);
  }

}
</style>
