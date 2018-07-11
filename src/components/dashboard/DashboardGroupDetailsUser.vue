<template>
  <div class="DashboardGroupDetailsUser">
    <UserList
      v-loading="pending"
      class="DashboardGroupDetails__user-list"
      :columns="columns"
      :users="sortedUsers"
      :selected-users.sync="selectedUsers"
      :total="totalUserCount"
      @page-changed="onPageChanged"/>

    <div class='DashboardGroupDetailsUser__buttons'>
      <BaseButton
        v-if="!isDefaultGroup && selectedUsers.length"
        @click="removeSelectedUsers"
        type="secondary">
        {{ removeFromGroupText }}
      </BaseButton>
      <BaseButton>{{ $t('button.addUsers') }}</BaseButton>
    </div>
  </div>
</template>

<script>
import { get } from 'vuex-pathify'

import UserList from '../user/UserList'
import UserProvider from '../../services/UserProvider'
import { sortAlphabetically } from '@/utils/array'

const userProvider = new UserProvider({
  fields: [
    'id',
    'firstname',
    'lastname',
    'email',
    'pictureUrl'
  ],
  orderBy: 'firstname',
  pageSize: 8
})

export default {
  components: {
    UserList
  },
  computed: {
    group: get('dashboard/groups/activeGroup'),
    isDefaultGroup: get('dashboard/groups/isDefaultGroup'),

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
      pending: false,
      users: [],
      selectedUsers: [],
      currentPage: 1,
      totalUserCount: 0,
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
          prop: 'role_name',
          slot: 'role',
          breakpointWidth: 0
        }
      ]
    }
  },

  watch: {
    group () {
      this.selectedUsers = []
      this.fetchUsers()
    }
  },

  methods: {
    async fetchUsers () {
      this.pending = true
      const { data: response } = await userProvider.listFromGroup({
        page: this.currentPage,
        groupId: this.group.id
      })
      if (response) {
        this.users = response.data
        this.totalUserCount = response.total
      }
      this.pending = false
    },

    onPageChanged (page) {
      this.currentPage = page
      this.fetchUsers()
    },

    async removeSelectedUsers () {
      const response = await this.$store.dispatch('group/removeUsers', {
        ids: this.selectedUsers,
        groupId: this.group.id
      })
      if (response.status === 200) {
        this.selectedUsers = []
        this.fetchUsers()
        this.$store.dispatch('dashboard/groups/list')
      }
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
</style>
