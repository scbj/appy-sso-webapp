<template lang="pug">
.activate-licence-page
  StepIndicator(
    :active='currentStep'
    :count='maxStep'
    v-show='shouldShowStepIndicator'
    class='step-indicator-licence-page' )
  .steps
    router-view
  ActivateLicenceMobile
  BaseLanguageSwitch.language
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import BaseLanguageSwitch from '@/components/base/BaseLanguageSwitch'
import ActivateLicenceMobile from './ActivateLicenceMobile'
import StepIndicator from './StepIndicator'

const { mapState } = createNamespacedHelpers('licence')

export default {
  components: {
    BaseLanguageSwitch,
    ActivateLicenceMobile,
    StepIndicator
  },

  computed: {
    ...mapState([
      'maxStep',
      'currentStep'
    ]),

    shouldShowStepIndicator () {
      return this.currentStep > 0 &&
        this.currentStep <= this.maxStep
    }
  },

  mounted () {
    this.updateActiveStep()
  },

  beforeRouteUpdate (to, from, next) {
    this.updateActiveStep(to)
    next()
  },

  methods: {
    updateActiveStep (to) {
      const step = (to && to.meta.step) || this.$route.meta.step || 1
      if (step <= this.maxStep) {
        this.activeStep = step
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// Breakpoint at which a message is displayed to users
// telling them to activate the license on a computer.
$width-breakpoint-mobile: 660px;

.activate-licence-page {
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  position: relative;

  @media screen and (min-width: $width-breakpoint-mobile) {
    background-image: url(/static/img/low-poly.svg);
    padding-top: 20vh;
    padding-bottom: 10vh;
    align-items: center;
    justify-content: flex-start;

    .activate-licence-mobile {
      display: none;
    }

    .step-indicator.step-indicator-licence-page {
      display: flex;
    }

    .steps {
      display: block;
    }
  }
}

.step-indicator.step-indicator-licence-page {
  display: none;
  margin-bottom: 4.2rem;
}

.steps {
  display: none;
}

.language {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 2rem;
}

.activate-licence-mobile {
  min-height: 100%;
}
</style>
