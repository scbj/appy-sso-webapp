<template lang="pug">
.ay-hello
  h2( v-text="message" )
</template>

<script>
export default {
  data () {
    return {
      firstname: 'John'
    }
  },
  computed: {
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
  font-size: 2rem;
  margin-left: 2rem;
  margin-bottom: 2rem;

  @media screen and (min-width: $mobile) {
    font-size: 2.4rem;
    margin-left: 0;
    margin-bottom: 2rem;
  }
}
</style>
