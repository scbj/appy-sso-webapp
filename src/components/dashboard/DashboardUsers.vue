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
import UserList from '@/components/user/UserList'
import UserProvider from '../../services/UserProvider'
import ModalUserCreate from '../../hold-components/modals/user/ModalUserCreate'

import { sortAlphabetically } from '@/utils/array'

const userProvider = new UserProvider({
  fields: [ 'id', 'firstname', 'lastname', 'email', 'pictureUrl', 'created_at', 'updated_at' ],
  orderBy: 'firstname',
  pageSize: 8
})

export default {
  components: {
    UserList
  },

  computed: {
    sortedUsers () {
      return sortAlphabetically(this.users, 'firstname')
    },

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
      users: [],
      currentPage: 1,
      selectedUsers: [],
      totalUserCount: 0,
      pending: false,
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
        },
        {
          label: this.$t('header.createdAt'),
          grow: 2,
          prop: 'created_at',
          slot: 'date',
          breakpointWidth: 1070
        },
        {
          label: this.$t('header.modifiedAt'),
          grow: 2,
          prop: 'updated_at',
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
    async fetchUsers () {
      this.pending = true
      const { data: response } = await userProvider.list({ page: this.currentPage })
      if (response && response.data) {
        this.users = response.data
        this.totalUserCount = response.total
      }
      this.pending = false
    },

    onPageChanged (page) {
      this.currentPage = page
      this.fetchUsers()
    },

    createUsers () {
      this.$store.dispatch('modal/open', {
        content: ModalUserCreate
      })
    },

    async deleteSelectedUsers () {
      const confident = await this.requestDeleteConfirmation()
      if (!confident) return

      const response = await this.$store.dispatch('user/remove', { ids: this.selectedUsers })
      if (response.status === 200) {
        this.selectedUsers = []
        this.fetchUsers()
      }
    },

    async requestDeleteConfirmation () {
      const message = this.$t('question.deleteUser')
      const title = this.$tc('title.deleteUser', this.selectedUsers.length)
      const options = {
        confirmButtonText: this.$tc('button.deleteUser', this.selectedUsers.length),
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
