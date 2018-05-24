<template lang="pug">
BaseModal.ModalUserCreate(
  v-on='$listeners'
  v-bind='$attrs' )
  h2.title {{ $t('title.createUser') }}
  ModalUserCreateForm
</template>

<script>
import ModalUserCreateForm from './ModalUserCreateForm'

export default {
  inheritAttrs: false,
  components: {
    ModalUserCreateForm
  },

  data () {
    return {
      name: '',
      email: '',
      password: ''
    }
  }
}
</script>
