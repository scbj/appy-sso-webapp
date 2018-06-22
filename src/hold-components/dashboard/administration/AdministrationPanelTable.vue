<template lang="pug">
.AdministrationPanelTable
  AdministrationPanelTableInfos
  AdministrationPanelTableList( v-show='totalUsers' )
</template>

<script>
import { get } from 'vuex-pathify'

import AdministrationPanelTableInfos from './AdministrationPanelTableInfos'
import AdministrationPanelTableList from './AdministrationPanelTableList'

export default {
  components: {
    AdministrationPanelTableInfos,
    AdministrationPanelTableList
  },
  computed: {
    totalUsers: get('dashboardAdministration/totalUsers')
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/colors';
@import '../../../assets/scss/vars.scss';

.AdministrationPanelTable {
  background-color: white;
  border-radius: 6px;
  font-size: 1.2rem;
  box-shadow: 0 5px 24px -6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 100%;
  overflow: hidden;
}
</style>
