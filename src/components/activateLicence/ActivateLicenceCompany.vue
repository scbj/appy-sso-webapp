<template lang="pug">
ActivateLicenceBaseStep.activate-licence-company(
  :title="$t('title.companyName')"
  :button="$t('button.next')"
  @next='next' )
  input(
    v-model='companyName'
    placeholder='The good company'
    @keyup.enter="next" )
  span.message.error( v-show='hasError' )
    | {{ $t('alert.invalidCompanyName') }},&nbsp;
    el-tooltip
      div( slot='content' v-html="$t('message.invalidCompanyName')" )
      span.learn-more {{ $t('learnMore') }}.
</template>

<script>
import ActivateLicenceBaseStep from './ActivateLicenceBaseStep'

export default {
  components: {
    ActivateLicenceBaseStep
  },

  data () {
    return {
      companyName: '',
      hasError: false
    }
  },

  mounted () {
    this.companyName = this.$store.state.licence.companyName
  },

  methods: {
    next () {
      this.hasError = this.companyName.length < 3
      if (this.hasError === false) {
        const step = this.$route.meta.step
        this.$store.dispatch('licence/updateCompanyName', { companyName: this.companyName })
        this.$store.dispatch('licence/completeStep', { step })
        this.$router.push({ name: 'activateOwner' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/activate-licence.scss';

input {
  text-align: center;
}
</style>
