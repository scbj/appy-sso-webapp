<template lang="pug">
.AdministrationPanelHeader
  HeaderGroupSelection
  HeaderRadioButtons
  el-dropdown(
    v-show='!isReadOnly'
    @command="handleCommand"
    placement='bottom-start' )
    BaseIcon.AdministrationPanelHeader__more( name='ios-more' )
    el-dropdown-menu( slot='dropdown' )
      el-dropdown-item( command='rename' ) {{ $t('button.rename') }}
      el-dropdown-item.AdministrationPanelHeader__delete-item(
        command='delete'
        divided )
        | {{ $t('button.delete') }}&nbsp;
        b {{ activeGroupName }}
</template>

<script>
import { get } from 'vuex-pathify'

import HeaderGroupSelection from './header/HeaderGroupSelection'
import HeaderRadioButtons from './header/HeaderRadioButtons'
import ModalGroupRename from '@/components/modals/group/ModalGroupRename'

export default {
  components: {
    HeaderGroupSelection,
    HeaderRadioButtons
  },

  computed: {
    activeGroupName: get('dashboardAdministration/activeGroupName'),
    activeGroupId: get('dashboardAdministration/activeGroupId'),
    isReadOnly: get('dashboardAdministration/isDefaultGroupActive')
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
      const confident = await this.requestDeleteConfirmation()
      if (!confident) return

      this.$store.dispatch('group/remove', {
        groupId: this.activeGroupId
      })
    },

    async requestDeleteConfirmation () {
      const message = this.$t('question.deleteGroup')
      const title = this.$t('title.deleteGroup', {
        groupName: this.activeGroupName
      })
      const options = {
        confirmButtonText: this.$t('button.deleteGroup'),
        cancelButtonText: this.$t('cancel'),
        type: 'warning'
      }

      try {
        await this.$confirm(message, title, options)
        return true
      } catch (error) {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.AdministrationPanelHeader {
  display: flex;
  align-items: center;
}

.HeaderRadioButtons {
  margin-left: 3rem;
}

.AdministrationPanelHeader__more {
  font-size: 2rem;
  color: #A250E5;
  margin-left: 1.5rem;
}

.AdministrationPanelHeader__delete-item {
  color: #C70F0F;
  &:hover {
    color: #C70F0F;
  }
}
</style>
