<template lang="pug">
.activate-licence-page
  StepIndicator( :active='activeStep' :count='3' v-show='completedStepCount < 3' )
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

  data () {
    return {
      activeStep: 1
    }
  },

  computed: {
    ...mapState([
      'completedStepCount'
    ])
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20vh;
  height: 100vh;
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
