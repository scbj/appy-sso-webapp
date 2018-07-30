<template>
  <div class="DashboardGroupList">
    <div class="DashboardGroupList__header">
      <h2>{{ $t('groups') }}</h2>
      <BaseIconButton
        @click="createGroup"
        class="DashboardGroupList__create-group-button"
        name="md-add" />
    </div>
    <el-input
      class='DashboardGroupList__search-bar'
      placeholder='Rechercher...'
      prefix-icon='el-icon-search'/>
    <DashboardGroupListItem
      v-if="defaultGroup"
      :group="defaultGroup"
      :read-only="true"
      :override-name="$t('byDefault')"
      @click.native="onGroupClick(defaultGroup)"
      class="DashboardGroupListItem__default-group" />
    <ul>
      <DashboardGroupListItem
        v-for="group in groups"
        :key="group.id"
        :group="group"
        @click.native="onGroupClick(group)" />
    </ul>
  </div>
</template>

<script>
import { get, sync } from 'vuex-pathify'

import DashboardGroupListItem from './DashboardGroupListItem'
import ModalGroupCreate from '@/components/dashboard/modals/group/ModalGroupCreate'

export default {
  components: {
    DashboardGroupListItem
  },
  computed: {
    groups: get('dashboard/groups/sortedList'),
    defaultGroup: get('dashboard/groups/defaultGroup'),
    activeGroup: get('dashboard/groups/activeGroup'),
    activeGroupId: sync('dashboard/groups/activeGroupId'),

    groupCount () {
      return this.groups.length
    }
  },

  methods: {
    onGroupClick (group) {
      this.activeGroupId = group.id
    },

    createGroup () {
      this.$store.dispatch('modal/open', {
        content: ModalGroupCreate,
        onClosed: () => this.$store.dispatch('dashboard/groups/list')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/colors.scss';

.DashboardGroupList {
  width: 20rem;
}

.DashboardGroupList__header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  user-select: none;
}

.DashboardGroupList__create-group-button {
  align-self: center;
}

.DashboardGroupList__search-bar {
  margin-top: 1rem;
}

.DashboardGroupList__user-count {
  color: $primaryColor;
  margin-left: .5em;
}

.DashboardGroupList__group {
  padding: .3em 0;
  margin: .2em 0;
}

.DashboardGroupList .DashboardGroupListItem__default-group {
  margin-top: 2em;
  margin-bottom: 1em;
}
</style>
