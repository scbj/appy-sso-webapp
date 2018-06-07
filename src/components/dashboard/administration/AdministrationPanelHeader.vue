<template lang="pug">
.AdministrationPanelHeader
  HeaderGroupSelection
  HeaderRadioButtons
  el-button.AdministrationPanelHeader__button-settings( type='text' )
    BaseIcon( name='ios-settings' )
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

.AdministrationPanelHeader__button-settings {
  font-size: 2rem;
  color: #A250E5;
  margin-left: 1.5rem;
}
</style>
