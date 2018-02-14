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
h2 {
  font-size: 2.4rem;
  margin-bottom: 1rem;
}
</style>
