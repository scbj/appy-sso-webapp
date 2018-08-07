<template>
  <BaseCard class='DashboardUsers'>
    <h2>{{ $t('users') }}</h2>
    <h3 v-if="totalUserCount" class='DashboardUsers__total-user'>{{ totalUserCount }}</h3>
    <el-input
      v-if="totalUserCount"
      class='DashboardUsers__search-bar'
      placeholder='Rechercher un utilisateur'
      prefix-icon='el-icon-search'/>

    <UserList
      v-loading="pending"
      class="DashboardUsers__user-list"
      :columns="columns"
      :users="users"
      :selected-users.sync="selectedUsers"
      :total="totalUserCount"
      @page-changed="fetchUsers"/>
    <div class='DashboardUsers__buttons'>
      <BaseButton
        v-if="selectionStateEnabled"
        @click="deleteSelectedUsers"
        type="secondary">
        {{ deleteUserText }}
      </BaseButton>
      <BaseButton @click='createUsers'>{{ $t('button.createMultipleUser') }}</BaseButton>
    </div>
  </BaseCard>
</template>

<script>
import { get, sync } from 'vuex-pathify'

import UserList from '@/components/user/UserList'
import ModalUserCreate from '@/components/dashboard/modals/user/ModalUserCreate'

export default {
  components: {
    UserList
  },

  computed: {
    pending: get('ui/dashboard/users/pending'),
    users: get('ui/dashboard/users/all'),
    selectedUsers: sync('ui/dashboard/users/selectedUsers'),
    currentPage: get('ui/dashboard/users/currentPage'),
    totalUserCount: get('ui/dashboard/users/totalUserCount'),

    /**
     * Returns true when at least one user is selected
     * from the list, otherwise returns false.
     * @returns {Boolean}
     */
    selectionStateEnabled () {
      return this.selectedUsers.length > 0
    },

    deleteUserText () {
      // The user must be informed of the state of his selection
      const count = this.selectedUsers.length
      return this.$tc('button.deleteUser', count, { count })
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
        },
        {
          label: this.$t('header.createdAt'),
          grow: 2,
          prop: 'createdAt',
          slot: 'date',
          breakpointWidth: 1070
        },
        {
          label: this.$t('header.modifiedAt'),
          grow: 2,
          prop: 'updatedAt',
          slot: 'date',
          breakpointWidth: 920
        }
      ]
    }
  },

  mounted () {
    this.fetchUsers()
  },

  methods: {
    async fetchUsers (page) {
      this.$store.dispatch('ui/dashboard/users/list', { page })
    },

    createUsers () {
      this.$store.dispatch('ui/modal/open', {
        content: ModalUserCreate,
        onClosed: this.fetchUsers
      })
    },

    async deleteSelectedUsers () {
      const confident = await this.requestDeleteConfirmation()
      if (confident) {
        this.$store.dispatch('ui/dashboard/users/deleteSelectedUsers')
      }
    },

    async requestDeleteConfirmation () {
      const message = this.$t('question.deleteUser')
      const title = this.$tc('title.deleteUser', this.selectedUsers.length)
      const selectedUserCount = this.selectedUsers.length
      const options = {
        confirmButtonText: this.$tc('button.deleteUser', selectedUserCount, { count: selectedUserCount }),
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
@import '../../assets/scss/colors.scss';
@import '../../assets/scss/mixins.scss';

.DashboardUsers {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.DashboardUsers__total-user {
  color: $primaryColor;
  margin-left: 2rem;
  flex-grow: 1;
}

.DashboardUsers__search-bar {
  width: 300px;
}

.DashboardUsers__user-list {
  flex-basis: 100%;
  flex-grow: 1;
  font-size: 1.2rem;
}

.DashboardUsers__buttons {
  flex-basis: 100%;
  flex-grow: 1;
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.DashboardUsers__user-profil-picture {
  @include size(24px);
  border-radius: 50%;
  justify-self: center;
}

.DashboardUsers__user-full-name:hover {
  text-decoration: underline;
  cursor: pointer;
}

.DashboardUsers__user-lastname {
  font-weight: 600;
}

.user-list__item {
  display: flex;

  .item__fullname {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }

    .item__lastname { font-weight: 600 }
  }
}
</style>
