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
      el-dropdown-item( v-show='groups && groups.length === 1' disabled ) {{ $t('noGroup') }}
      el-dropdown-item(
        v-for='group in groupsWithoutDefault'
        :key='group.id'
        :command='group.id'
        class='group'
        :class='{ active: isActive(group.id) }') {{ group.name }}
      el-dropdown-item(
        :command='defaultGroup.id'
        class='group'
        :class='{ active: isActive(defaultGroup.id) }'
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
import { get } from 'vuex-pathify'
// import { createNamespacedHelpers } from 'vuex'

// const { mapState } = createNamespacedHelpers('group')

export default {
  data () {
    return {
      activeGroupId: -1
    }
  },

  computed: {
    groups: get('group/groups'),

    /**
     * Returns true if the group number is too big for the
     * "Create a group" button to be at the end of the list
     */
    shouldShowSeparateButton () {
      return this.groups && this.groups.length > 12
    },

    /** Returns the default group. */
    defaultGroup () {
      return {
        id: -1,
        name: this.$t('byDefault')
      }
    },

    /** Returns the name of the selected group. */
    activeGroupName () {
      if (this.activeGroupId === this.defaultGroup.id) {
        return this.defaultGroup.name
      }
      const group = this.groups.find(group => group.id === this.activeGroupId)
      return group.name
    },

    groupsWithoutDefault () {
      if (this.groups === undefined) {
        console.log('Oups... groups is undefined')
      }

      /** Compare function by name attribute. */
      const byName = (first, second) => {
        const firstName = first.name && first.name.toLowerCase()
        const secondName = second.name && second.name.toLowerCase()
        if (firstName > secondName) return 1
        else if (firstName < secondName) return -1
        return 0
      }

      /** Filter function without default group. */
      const withoutDefault = group => group.name !== 'default'

      return this.groups
        .filter(withoutDefault)
        .sort(byName)
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
