<template>
  <BaseCard class="DashboardGroups" v-loading="pending">
    <DashboardGroupList />
    <DashboardGroupDetails v-if="activeGroup" />
  </BaseCard>
</template>

<script>
import { get } from 'vuex-pathify'

import DashboardGroupList from './DashboardGroupList'
import DashboardGroupDetails from './DashboardGroupDetails'

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

    // We must select a default group when the page loads
    const defaultGroupId = this.$store.get('group/defaultGroup@id')
    this.$store.set('ui/dashboard/groups/activeGroupId', defaultGroupId)
  }
}
</script>

<style lang="scss" scoped>
.DashboardGroups {
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
