<template lang="pug">
.administration-panel-header
  HeaderGroupSelection
  HeaderRadioButtons
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
.administration-panel-header {
  display: flex;
  align-items: center;
}

.header-radio-buttons {
  margin-left: 3rem;
}
</style>
