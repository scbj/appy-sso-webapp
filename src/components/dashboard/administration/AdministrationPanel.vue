<template lang="pug">
.administration-panel
  AdministrationPanelHeader
  .master
    AdministrationPanelTable
    AdministrationPanelListUsers
</template>

<script>
import AdministrationPanelHeader from './AdministrationPanelHeader'
import AdministrationPanelTable from './AdministrationPanelTable'
import AdministrationPanelListUsers from './AdministrationPanelListUsers'

export default {
  components: {
    AdministrationPanelHeader,
    AdministrationPanelTable,
    AdministrationPanelListUsers
  }
}
</script>

<style lang="scss" scoped>
.master,
.administration-panel-header {
  margin-top: 1rem;
}

.master {
  display: flex;
  flex-direction: row;
  align-items: flex-start;

  .administration-panel-table {
    flex-grow: 2
  }

  .administration-panel-list-users {
    flex-grow: 1;
    margin: 0 2rem;
    margin-bottom: 2rem;
  }
}
</style>
