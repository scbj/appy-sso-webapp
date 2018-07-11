<template>
  <div class="DashboardGroupDetailsUser">
    <UserList
      v-loading="pending"
      ref="userList"
      class="DashboardGroupDetails__user-list"
      :columns="columns"
      :users="sortedUsers"
      :selected-users.sync="selectedUsers"
      :total="totalUserCount"
      @page-changed="onPageChanged">
      <template slot='full-name' slot-scope="row" >
        <span class="DashboardUsers__user-full-name">
          {{ row.item.firstname }}
          <span class="DashboardUsers__user-lastname">{{ row.item.lastname }}</span>
        </span>
      </template>
      <template slot='profil-picture' slot-scope='row'>
        <BaseImage
          class='DashboardUsers__user-profil-picture'
          :src='row.item.pictureUrl'
          fallback-src='/static/img/default-user-picture.png'/>
      </template>
    </UserList>

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
import api from '../../api/v1/index'
import { sortAlphabetically } from '@/utils/array'

export default {
  components: {
    UserList
  },
  computed: {
    group: get('dashboard/groups/activeGroup'),

    isDefaultGroup () {
      return this.group.name === 'default'
    },

    sortedUsers () {
      return sortAlphabetically(this.users, 'firstname')
    },

    totalUserCount () {
      return this.group.user_count
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
      const { data: response } = await api.group.listUsers({
        page: this.currentPage,
        groupId: this.group.id
      })
      if (response && response.data) {
        this.users = response.data
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
