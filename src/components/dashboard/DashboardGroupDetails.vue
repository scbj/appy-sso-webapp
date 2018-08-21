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
          <el-dropdown-item command="rename">
            <BaseIcon name="md-create" />
            &nbsp;Renommer
          </el-dropdown-item>
          <el-dropdown-item command="delete">
            <BaseIcon name="md-trash" />
            &nbsp;Supprimer
          </el-dropdown-item>
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
        <DashboardGroupDetailsApplications />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

import DashboardGroupDetailsUser from './DashboardGroupDetailsUser'
import DashboardGroupDetailsApplications from './DashboardGroupDetailsApplications'
import ModalGroupRename from '@/components/dashboard/modals/group/ModalGroupRename'

export default {
  components: {
    DashboardGroupDetailsUser,
    DashboardGroupDetailsApplications
  },

  computed: {
    group: get('ui/dashboard/groups/activeGroup'),
    isDefaultGroup: get('ui/dashboard/groups/isDefaultGroupActive'),

    groupName () {
      return this.isDefaultGroup
        ? this.$t('byDefault')
        : this.group.name
    }
  },

  data () {
    return {
      activeTabName: 'apps'
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
      this.$store.dispatch('ui/modal/open', {
        content: ModalGroupRename
      })
    },

    async deleteGroup () {
      this.$store.dispatch('ui/dashboard/groups/removeActiveGroup')
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
