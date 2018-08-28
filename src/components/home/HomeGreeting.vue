<template>
  <div class="HomeGreeting">
    <h3>{{ message }}</h3>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

export default {
  computed: {
    firstname: get('user/current@firstname'),
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
