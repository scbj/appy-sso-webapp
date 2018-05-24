<template lang="pug">
el-form.ModalUserCreateForm(
  @submit.native.prevent=''
  ref='form'
  :model='form'
  :rules='rules'
  status-icon )
  el-form-item( prop='name' :label="$t('placeholder.email')" )
    el-input( v-model='form.name' @keyup.enter.native='validate' )
  el-form-item.buttons
    el-button( type='text' @click="$emit('requestClose')" ) {{ $t('cancel') }}
    el-button( type='primary' @click='validate' )  {{ $t('button.validate') }}
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>
