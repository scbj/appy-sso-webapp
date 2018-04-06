<template lang="pug">
ActivateLicenceBaseStep.activate-licence-company(
  :title="$t('title.companyName')"
  :button="$t('button.next')"
  @next='next'
)
  input( v-model='companyName' placeholder='The good company' )
</template>

<script>
import ActivateLicenceBaseStep from './ActivateLicenceBaseStep'

export default {
  components: {
    ActivateLicenceBaseStep
  },

  data () {
    return {
      companyName: '',
      hasError: false
    }
  },

  methods: {
    next () {
      this.hasError = this.companyName.length < 2
      if (this.hasError === false) {
        this.$emit('next')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/activate-licence.scss';

input {
  text-align: center;
}
</style>
