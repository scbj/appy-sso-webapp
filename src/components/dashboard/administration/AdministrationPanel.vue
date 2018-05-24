<template lang="pug">
.AdministrationPanel
  AdministrationPanelHeader
  AdministrationPanelTable
  el-pagination.AdministrationPanel__pagination(
    background
    layout='prev, pager, next'
    :total='40'
    :current-page='1'
    :page-size='10'
    @current-change='changePage' )
</template>

<script>
import AdministrationPanelHeader from './AdministrationPanelHeader'
import AdministrationPanelTable from './AdministrationPanelTable'

export default {
  components: {
    AdministrationPanelHeader,
    AdministrationPanelTable
  }
}
</script>

<style lang="scss" scoped>
.AdministrationPanelHeader,
.AdministrationPanelTable,
.AdministrationPanel__pagination {
  margin-top: 2rem;
}
</style>
