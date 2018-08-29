<template>
  <div class="DashboardGroupList">
    <div class="DashboardGroupList__header">
      <h2>{{ $t('groups') }}</h2>
      <BaseIconButton
        class="DashboardGroupList__create-group-button"
        name="md-add"
        @click="createGroup" />
    </div>
    <el-input
      v-model="query"
      :placeholder="$t('search')"
      class="DashboardGroupList__search-bar"
      prefix-icon="el-icon-search"/>
    <DashboardGroupListItem
      v-if="defaultGroup"
      v-show="!query"
      :group="defaultGroup"
      :read-only="true"
      :override-name="$t('byDefault')"
      class="DashboardGroupListItem__default-group"
      @click.native="onGroupClick(defaultGroup)" />
    <p
      v-show="query"
      class="DashboardGroupList__search-result"
      v-html="searchResultMessage"/>
    <ul>
      <DashboardGroupListItem
        v-for="group in filteredGroups"
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

  data () {
    return {
      query: ''
    }
  },

  computed: {
    groups: get('group/sortedList'),
    defaultGroup: get('group/defaultGroup'),
    activeGroup: get('ui/dashboard/groups/activeGroup'),
    activeGroupId: sync('ui/dashboard/groups/activeGroupId'),

    groupCount () {
      return this.groups.length
    },

    filteredGroups () {
      const query = this.query.toLowerCase()
      const match = group => {
        const name = group.name.toLowerCase()
        return name.indexOf(query) !== -1
      }
      return this.groups.filter(match)
    },

    searchResultMessage () {
      const count = this.filteredGroups.length
      const query = this.query
      return this.$tc('message.groupSearchResults', count, { count, query })
    }
  },

  methods: {
    onGroupClick (group) {
      this.activeGroupId = group.id
    },

    createGroup () {
      this.$store.dispatch('ui/modal/open', {
        content: ModalGroupCreate
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
  color: $primary-color;
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

.DashboardGroupList__search-result {
  font-style: italic;
  color: $primary-color;
  margin-bottom: 1em;
  margin-top: 2em;
  font-size: 1.1rem;
}
</style>
