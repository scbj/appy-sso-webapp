<template lang="pug">
.AdministrationPanelHeader
  HeaderGroupSelection
  HeaderRadioButtons
  el-button.AdministrationPanelHeader__button-edit( type='text' ) {{ $t('button.edit') }}
</template>

<script>
import HeaderGroupSelection from './header/HeaderGroupSelection'
import HeaderRadioButtons from './header/HeaderRadioButtons'

export default {
  components: {
    HeaderGroupSelection,
    HeaderRadioButtons
  }
}
</script>

<style lang="scss" scoped>
.AdministrationPanelHeader {
  display: flex;
  align-items: center;
}

.AdministrationPanelHeader__button-edit {
  color: #A250E5;
  margin-left: 1.5rem;
}

.HeaderRadioButtons {
  margin-left: 3rem;
}
</style>
