<template lang="pug">
.activate-licence-page
  StepIndicator( :active='activeStep' :count='3' )
  ActivateLicenceKey( v-if='activeStep === 1' @next='next' )
  ActivateLicenceCompany( v-else-if='activeStep === 2' @next='next' )
  ActivateLicenceOwner( v-else-if='activeStep === 3' @next='next' )
  BaseLanguageSwitch.language
</template>

<script>
import BaseLanguageSwitch from '@/components/base/BaseLanguageSwitch'
import ActivateLicenceKey from './ActivateLicenceKey'
import ActivateLicenceCompany from './ActivateLicenceCompany'
import ActivateLicenceOwner from './ActivateLicenceOwner'
import StepIndicator from './StepIndicator'

export default {
  components: {
    BaseLanguageSwitch,
    ActivateLicenceKey,
    ActivateLicenceCompany,
    ActivateLicenceOwner,
    StepIndicator
  },

  data () {
    return {
      activeStep: 1
    }
  },

  methods: {
    next () {
      this.activeStep = this.activeStep + 1
    }
  }
}
</script>

<style lang="scss" scoped>
.activate-licence-page {
  background-image: url(/static/img/low-poly.svg);
  background-size: cover;
  background-position: center;
  height: 100vh;
  padding-top: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.step-indicator {
  margin-bottom: 4.2rem;
}

.language {
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 2rem;
}
</style>
