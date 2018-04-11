<template lang="pug">
.activate-licence-page
  StepIndicator( :active='activeStep' :count='3' )
  router-view
  BaseLanguageSwitch.language
</template>

<script>
import BaseLanguageSwitch from '@/components/base/BaseLanguageSwitch'
import StepIndicator from './StepIndicator'

export default {
  components: {
    BaseLanguageSwitch,
    StepIndicator
  },

  data () {
    return {
      activeStep: 1
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
      this.activeStep = (to && to.meta.step) || this.$route.meta.step || 1
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
