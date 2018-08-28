<template>
  <BaseCard v-loading="pending" class="ViewDashboardGroups">
    <DashboardGroupList />
    <DashboardGroupDetails v-if="activeGroup" />
  </BaseCard>
</template>

<script>
import { get } from 'vuex-pathify'

import DashboardGroupList from '@/components/dashboard/DashboardGroupList'
import DashboardGroupDetails from '@/components/dashboard/DashboardGroupDetails'

export default {
  components: {
    DashboardGroupList,
    DashboardGroupDetails
  },

  computed: {
    pending: get('ui/dashboard/groups/pending'),
    activeGroup: get('ui/dashboard/groups/activeGroup')
  },

  async mounted () {
    await this.$store.dispatch('group/list')
    this.$store.dispatch('ui/dashboard/groups/setDefaultGroupAsActive')
  }
}
</script>

<style lang="scss" scoped>
.ViewDashboardGroups {
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

.DashboardGroupList {
  margin-right: 4rem;
}

.DashboardGroupDetails {
  flex-grow: 4;
}
</style>
