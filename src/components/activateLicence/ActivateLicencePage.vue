<template lang="pug">
.activate-licence-page
  StepIndicator( :active='activeStep' :count='3' )
</template>

<script>
import ActivateLicenceKey from './ActivateLicenceKey'
import ActivateLicenceCompany from './ActivateLicenceCompany'
import ActivateLicenceOwner from './ActivateLicenceOwner'
import StepIndicator from './StepIndicator'

export default {
  components: {
    ActivateLicenceKey,
    ActivateLicenceCompany,
    ActivateLicenceOwner,
    StepIndicator
  },
  data () {
    return {
      activeStep: 1
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
  padding: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
