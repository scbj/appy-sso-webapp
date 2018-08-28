<template>
  <div class="ViewActivateLicence">
    <StepIndicator
      v-show="shouldShowStepIndicator"
      :active="currentStep"
      :count="maxStep"
      class="ViewActivateLicence__StepIndicator"/>
    <div class="steps">
      <router-view/>
    </div>
    <MobileActivateLicenceNotAvailable/>
    <BaseLanguageSwitch class="language"/>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

import MobileActivateLicenceNotAvailable from '@/components/licence/MobileActivateLicenceNotAvailable'
import StepIndicator from '@/components/licence/StepIndicator'

export default {
  components: {
    MobileActivateLicenceNotAvailable,
    StepIndicator
  },

  computed: {
    maxStep: get('ui/licence/maxStep'),
    currentStep: get('ui/licence/currentStep'),

    shouldShowStepIndicator () {
      return this.currentStep > 0 && this.currentStep <= this.maxStep
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

.ViewActivateLicence {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
  position: relative;

  @media screen and (min-width: $width-breakpoint-mobile) {
    background: linear-gradient(rgba(black, .01), rgba(black, .05));
    padding-top: 20vh;
    padding-bottom: 10vh;
    align-items: center;
    justify-content: flex-start;

    .MobileActivateLicenceNotAvailable {
      display: none;
    }

    .ViewActivateLicence__StepIndicator {
      display: flex;
    }

    .steps {
      display: block;
    }
  }
}

.ViewActivateLicence__StepIndicator {
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

.MobileActivateLicenceNotAvailable {
  min-height: 100%;
}
</style>
