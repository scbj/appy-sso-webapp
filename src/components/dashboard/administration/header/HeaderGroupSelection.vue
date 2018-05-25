<template lang="pug">
.header-group-selection
  template( v-if='shouldShowSeparateButton' )
    el-tooltip( :content="$t('button.createGroup')" :open-delay=500 )
      el-button(
        type='text'
        class='button-group-add button-standalone'
        @click="$store.dispatch('ui/openModalGroupCreate')")
        i( class='el-icon-plus el-icon--left' )
    el-tooltip( :content="$t('button.switchGroup')" :open-delay=500 )
      el-button {{ activeGroupName }}...
  el-dropdown( v-else placement='bottom-start' @command='setActive' )
    span( class='el-dropdown-link' )
      | {{ activeGroupName }} <i class="el-icon-arrow-down el-icon--right"></i>
    el-dropdown-menu( slot='dropdown' )
      el-dropdown-item( v-show='groups && groups.length === 1' disabled ) {{ $t('noGroup') }}
      el-dropdown-item(
        v-for='group in groups'
        :key='group.id'
        :command='group.id'
        class='group'
        :class='{ active: isActive(group.id) }') {{ group.name }}
      el-dropdown-item(
        :command='defaultGroupId'
        class='group'
        :class='{ active: isActive(defaultGroupId) }'
        divided) {{ $t('byDefault') }}
      el-dropdown-item( divided )
        el-button(
          type='text'
          class='button-group-add'
          @click="$store.dispatch('ui/openModalGroupCreate')")
          i( class='el-icon-plus el-icon--left' )
          | {{ $t('button.createGroup') }}
</template>

<script>
import { get, sync } from 'vuex-pathify'

export default {
  computed: {
    groups: get('group/groups'),
    activeGroupId: sync('dashboardAdministration/activeGroupId'),
    defaultGroupId: get('dashboardAdministration/defaultGroupId'),
    pending: sync('dashboardAdministration/pending'),

    /**
     * Returns true if the group number is too big for the
     * "Create a group" button to be at the end of the list
     */
    shouldShowSeparateButton () {
      return this.groups && this.groups.length > 12
    },

    isDefaultGroupActive () {
      return this.activeGroupId === this.defaultGroupId
    },

    /** Returns the name of the selected group. */
    activeGroupName () {
      if (this.isDefaultGroupActive || this.activeGroupId === -1) {
        return this.$t('byDefault')
      }
      const group = this.groups.find(group => group.id === this.activeGroupId)
      return group.name
    }
  },

  watch: {
    defaultGroupId (newValue) {
      if (this.activeGroupId === -1) {
        this.activeGroupId = newValue
      }
    }
  },

  async mounted () {
    await this.$store.dispatch('group/list')
  },

  methods: {
    isActive (id) {
      return this.activeGroupId === id
    },

    setActive (id) {
      if (typeof id === 'number') {
        this.activeGroupId = id
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.button-group-add,
.button-group-add:hover {
  color: #A250E5;
}

.button-group-add.button-standalone {
  font-size: 1.4rem;
  margin-bottom: 0;
}

.header-group-selection {
  display: flex;
  align-items: center;
}

.group.active {
  font-weight: bold
}
</style>
