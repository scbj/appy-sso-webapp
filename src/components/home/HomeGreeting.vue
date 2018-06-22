<template lang="pug">
.HomeGreeting
  h3( v-text='message' )
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  computed: {
    firstname: get('user/firstname'),
    message () {
      const firstname = this.firstname
      return this.$t('message.hello', { firstname })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/vars.scss';

h2 {
  // text
  text-align: center;
  // position
  margin-bottom: 2rem;

  @media screen and (min-width: $mobile) {
    // text
    text-align: left;
  }
}
</style>
