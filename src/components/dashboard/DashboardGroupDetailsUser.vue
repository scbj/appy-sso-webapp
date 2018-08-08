<template>
  <div class="DashboardGroupDetailsUser">
    <!-- When there are no users in the active group -->
    <div v-if="!group.userCount" class="DashboardGroupDetailsUser__no-users">
      <BaseIcon name="md-bed" />
      <span>
        {{ $t('message.noData.userInGroup') }}
      </span>
      <BaseButton @click="addUsers" type="secondary">{{ $t('button.addUsers') }}</BaseButton>
    </div>

    <!-- When there is one or more users in the active group -->
    <template v-else>
      <UserList
        v-loading="pending"
        class="DashboardGroupDetails__user-list"
        :columns="columns"
        :users="sortedUsers"
        :selected-users.sync="selectedUsers"
        :total="totalUserCount"
        @page-changed="fetchUsers"/>

      <div class='DashboardGroupDetailsUser__buttons'>
        <transition name="button-appear">
          <BaseButton
            v-if="!isDefaultGroup && selectedUsers.length"
            @click="removeSelectedUsers"
            type="secondary">
            {{ removeFromGroupText }}
          </BaseButton>
        </transition>
        <BaseButton @click="addUsers">{{ $t('button.addUsers') }}</BaseButton>
      </div>
    </template>
  </div>
</template>

<script>
import { get, sync } from 'vuex-pathify'

import ModalGroupAddUsers from '@/components/dashboard/modals/group/ModalGroupAddUsers'
import UserList from '@/components/user/UserList'
import { sortAlphabetically } from '@/utils/array'

export default {
  components: {
    UserList,
    ModalGroupAddUsers
  },
  computed: {
    group: get('ui/dashboard/groups/activeGroup'),
    isDefaultGroup: get('ui/dashboard/groups/isDefaultGroupActive'),
    pending: get('ui/dashboard/groups/users/pending'),
    users: get('ui/dashboard/groups/users/all'),
    selectedUsers: sync('ui/dashboard/groups/users/selectedUsers'),
    currentPage: get('ui/dashboard/groups/users/currentPage'),
    totalUserCount: get('ui/dashboard/groups/users/totalUserCount'),

    sortedUsers () {
      return sortAlphabetically(this.users, 'firstname')
    },

    removeFromGroupText () {
      // The user must be informed of the state of his selection
      const count = this.selectedUsers.length
      return this.$tc('button.removeFromGroup', count, { count })
    }
  },

  data () {
    return {
      columns: [
        {
          grow: 1,
          breakpointWidth: 660,
          slot: 'profil-picture'
        },
        {
          label: this.$t('header.fullName'),
          grow: 5,
          slot: 'full-name'
        },
        {
          label: this.$t('header.email'),
          grow: 8,
          prop: 'email',
          breakpointWidth: 600
        },
        {
          label: this.$t('header.role'),
          grow: 1.6,
          prop: 'roleName',
          slot: 'role',
          breakpointWidth: 0
        }
      ]
    }
  },

  watch: {
    group () {
      this.$store.dispatch('ui/dashboard/groups/users/reset')
      this.fetchUsers()
    }
  },

  methods: {
    async fetchUsers (page) {
      this.$store.dispatch('ui/dashboard/groups/users/list', { page })
    },

    addUsers () {
      this.$store.dispatch('ui/modal/open', {
        content: ModalGroupAddUsers,
        onClosed: this.fetchUsers
      })
    },

    async removeSelectedUsers () {
      this.$store.dispatch('ui/dashboard/groups/users/removeSelectedUsers')
    }
  },

  mounted () {
    this.fetchUsers()
  }
}
</script>

<style lang="scss" scoped>
.DashboardGroupDetailsUser {
  display: flex;
  flex-direction: column;
}

.DashboardGroupDetailsUser__buttons {
  align-self: flex-end;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 2rem;
}

.DashboardGroupDetailsUser__no-users {
  color: #C0C4CC;
  margin: 0 auto;
  padding: 3em 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > .BaseIcon {
    opacity: .3;
    font-size: 6em;
    line-height: 1;
  }

  > span { text-align: center; }

  > .BaseButton {
    margin-top: .8em;
    opacity: 0;
    transform: translateY(-.2em);
    animation: appear .4s ease-in-out  forwards;

    @keyframes appear {
      to {
        opacity: 1;
        transform: translateY(0)
      }
    }
  }
}

// Transition classes of the remove button
.button-appear-enter-active { transition: .2s ease-out }
.button-appear-leave-active { transition: .1s ease-in-out }
.button-appear-enter { transform: translateX(.3em) }
.button-appear-leave-to { opacity: 0 }
</style>
