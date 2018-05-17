<template lang="pug">
.header-group-selection
  template( v-if='shouldShowSeparateButton' )
    el-tooltip( :content="$t('button.createGroup')" :open-delay=500 )
      el-button(
        type='text'
        class='button-group-add button-standalone'
        @click="$store.dispatch('ui/openModal')")
        i( class='el-icon-plus el-icon--left' )
    el-tooltip( :content="$t('button.switchGroup')" :open-delay=500 )
      el-button {{ activeGroupName }}...
  el-dropdown( v-else placement='bottom-start' @command='setActive' )
    span( class='el-dropdown-link' )
      | {{ activeGroupName }} <i class="el-icon-arrow-down el-icon--right"></i>
    el-dropdown-menu( slot='dropdown' )
      el-dropdown-item( v-show='storeGroups.length === 1' disabled ) {{ $t('noGroup') }}
      el-dropdown-item(
        v-for='group in groups'
        :key='group.id'
        :command='group'
        class='group'
        :class='{ active: isActive(group) }') {{ group.name }}
      el-dropdown-item(
        :command='defaultGroup'
        class='group'
        :class='{ active: isActive(defaultGroup) }'
        divided) {{ defaultGroup.name }}
      el-dropdown-item( divided )
        el-button(
          type='text'
          class='button-group-add'
          @click="$store.dispatch('ui/openModal')")
          i( class='el-icon-plus el-icon--left' )
          | {{ $t('button.createGroup') }}
</template>

<script>
export default {
  data () {
    return {
      activeGroupId: -1,
      storeGroups: [
        { id: 0, name: 'default' },
        { id: 2, name: 'DigiSmart' },
        { id: 6, name: 'Motive' },
        { id: 3, name: 'Ethics Yachting' },
        { id: 5, name: 'Merlane' },
        { id: 1, name: 'B&T Associés' },
        { id: 4, name: 'Ethics Group' },
        { id: 7, name: 'Parmenion' }
      ]
    }
  },

  computed: {
    /**
     * Returns true if the group number is too big for the
     * "Create a group" button to be at the end of the list
     */
    shouldShowSeparateButton () {
      return this.groups.length > 12
    },
    /** Returns the name of the selected group. */
    activeGroupName () {
      const group = this.storeGroups.find(group => group.id === this.activeGroupId)
      return group.id === this.defaultGroup.id
        ? this.defaultGroup.name
        : group.name
    },
    /** Returns the default group. */
    defaultGroup () {
      const { id } = this.storeGroups.find(group => group.name === 'default')
      return {
        id,
        name: this.$t('byDefault')
      }
    },
    /** Returns all the groups with the default group at the end. */
    groups () {
      const byName = (first, second) => {
        const firstName = first.name && first.name.toLowerCase()
        const secondName = second.name && second.name.toLowerCase()
        if (firstName > secondName) return 1
        else if (firstName < secondName) return -1
        return 0
      }
      const withoutDefaultGroup = group => group.name !== 'default'
      return this.storeGroups.filter(withoutDefaultGroup).sort(byName)
    }
  },

  created () {
    // select the default group at creation
    this.activeGroupId = this.defaultGroup.id
  },

  methods: {
    isActive (group) {
      return this.activeGroupId === group.id
    },
    setActive (group) {
      if (group && this.activeGroupId !== group.id) {
        this.activeGroupId = group.id
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
