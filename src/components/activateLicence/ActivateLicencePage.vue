<template lang="pug">
.activate-licence-page
  StepIndicator(
    :active='currentStep'
    :count='maxStep'
    v-show='shouldShowStepIndicator' )
  router-view
  BaseLanguageSwitch.language
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import BaseLanguageSwitch from '@/components/base/BaseLanguageSwitch'
import StepIndicator from './StepIndicator'

const { mapState } = createNamespacedHelpers('licence')

export default {
  components: {
    BaseLanguageSwitch,
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
.activate-licence-page {
  background-image: url(/static/img/low-poly.svg);
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20vh;
  padding-bottom: 10vh;
  min-height: 100vh;
}

.step-indicator {
  margin-bottom: 4.2rem;
}

.language {
  position: fixed;
  right: 0;
  bottom: 0;
  margin: 2rem;
}
</style>
