<template lang="pug">
.AdministrationPanel
  AdministrationPanelHeader
  AdministrationPanelTable
  el-pagination.AdministrationPanel__pagination(
    background
    layout='prev, pager, next'
    :total='totalUsers'
    :page-size='pageSize'
    @current-change='changePage' )
</template>

<script>
import { get, sync } from 'vuex-pathify'

import AdministrationPanelHeader from './AdministrationPanelHeader'
import AdministrationPanelTable from './AdministrationPanelTable'

export default {
  components: {
    AdministrationPanelHeader,
    AdministrationPanelTable
  },

  computed: {
    activeGroupId: get('dashboardAdministration/activeGroupId'),
    currentPage: sync('dashboardAdministration/currentPage'),
    pageSize: get('dashboardAdministration/pageSize'),
    pending: sync('dashboardAdministration/pending'),
    totalUsers: get('dashboardAdministration/totalUsers')
  },

  watch: {
    activeGroupId () {
      this.updateUserList()
    }
  },

  methods: {
    changePage (page) {
      this.currentPage = page
      this.updateUserList()
    },

    async updateUserList () {
      this.pending = true
      await this.$store.dispatch('group/listUsers', {
        groupId: this.activeGroupId,
        page: this.currentPage
      })
      this.pending = false
    }
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
