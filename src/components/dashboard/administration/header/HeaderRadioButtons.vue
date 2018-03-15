<template lang="pug">
el-radio-group.header-radio-buttons( v-model='selected' )
  el-radio-button( label='users' ) {{ $t('button.users') }}
  el-radio-button( label='applications' ) {{ $t('button.applications') }}
</template>

<script>
export default {
  data () {
    return {
      selected: 'users'
    }
  }
}
</script>
