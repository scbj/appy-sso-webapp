<template>
  <div class="DashboardGroupDetails">
    <div class="DashboardGroupDetails__header">
      <h2>{{ groupName }}</h2>
      <el-dropdown
        v-if="!isDefaultGroup"
        @command="handleCommand"
        trigger="click">
        <BaseIconButton name="ios-more" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="rename">Renommer</el-dropdown-item>
          <el-dropdown-item command="delete">Supprimer</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
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
import DashboardGroupDetailsApplications from './DashboardGroupDetailsApplications'
import ModalGroupRename from '../../hold-components/modals/group/ModalGroupRename'
import api from '../../api/v1/index'

export default {
  components: {
    DashboardGroupDetailsUser,
    DashboardGroupDetailsApplications
  },

  computed: {
    group: get('dashboard/groups/activeGroup'),
    isDefaultGroup: get('dashboard/groups/isDefaultGroup'),

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
  },

  methods: {
    handleCommand (command) {
      switch (command) {
        case 'rename': return this.renameGroup()
        case 'delete': return this.deleteGroup()
      }
    },

    renameGroup () {
      this.$store.dispatch('modal/open', {
        content: ModalGroupRename
      })
    },

    async deleteGroup () {
      const response = await api.group.remove({
        groupId: this.group.id
      })
      if (response.status === 200) {
        this.$store.dispatch('dashboard/groups/list')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/colors.scss';

.DashboardGroupDetails {
  display: flex;
  flex-direction: column;
}

.DashboardGroupDetails__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.DashboardGroupDetails__tabs {
  flex-grow: 1;
  margin-top: 1rem;
}

h2::selection {
  color: white;
  background: rgba($primaryColor, .8);
}
</style>
