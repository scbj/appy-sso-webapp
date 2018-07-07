<template>
  <div class="DashboardGroupDetails">
    <h2>{{ groupName }}</h2>
    <el-tabs
      v-model="activeTabName"
      class="DashboardGroupDetails__tabs">
      <el-tab-pane :label="$t('users')" name="users">
        <DashboardGroupDetailsUser />
      </el-tab-pane>
      <el-tab-pane :label="$t('button.applications')" name="apps">
        Yo
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

import DashboardGroupDetailsUser from './DashboardGroupDetailsUser'

export default {
  components: {
    DashboardGroupDetailsUser
  },

  computed: {
    group: get('dashboard/groups/activeGroup'),

    isDefaultGroup () {
      return this.group.name === 'default'
    },

    groupName () {
      return this.isDefaultGroup
        ? this.$t('byDefault')
        : this.group.name
    }
  },

  data () {
    return {
      activeTabName: 'users'
    }
  }
}
</script>

<style lang="scss" scoped>
.DashboardGroupDetails {
  display: flex;
  flex-direction: column;
}

.DashboardGroupDetails__tabs {
  flex-grow: 1;
  margin-top: 1rem;
}
</style>
