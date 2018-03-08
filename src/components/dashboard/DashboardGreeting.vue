<template lang="pug">
.dashboard-greeting
  h2( v-text='message' )
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('user')

export default {
  computed: {
    ...mapState([
      'firstname'
    ]),
    message () {
      const firstname = this.firstname
      return this.$t('message.hello', { firstname })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/vars';

h2 {
  // text
  font-size: 1.8rem;
  font-weight: 500;
  text-align: center;
  // position
  margin-bottom: 2rem;

  @media screen and (min-width: $mobile) {
    // text
    text-align: left;
    font-size: 2.1rem;
    font-weight: 500;
    // position
    margin-bottom: 2rem;
  }
}
</style>
