<template lang="pug">
ActivateLicenceBaseStep.activate-licence-owner(
  :title="$t('title.ownerInfos')",
  :button="$t('button.create')"
  @next='next'
)
</template>

<script>
import ActivateLicenceBaseStep from './ActivateLicenceBaseStep'

export default {
  components: {
    ActivateLicenceBaseStep
  },

  data () {
    return {
      name: '',
      email: '',
      picture: ''
    }
  },

  methods: {
    next () {
      console.log('Hello from next handler!')
    }
  }
}
</script>
