<template>
  <ModalForm
    :model="form"
    :primary-button-text="createGroupLabel"
    @validated="formValidated"
    class="ModalGroupCreateAddUsers">
    <el-form-item prop="query" :label="$t('label.addUsers')">
      <el-input
        ref="searchInput"
        v-model="form.query"
        :placeholder="$t('placeholder.search')"
        prefix-icon="el-icon-search" />
    </el-form-item>
    <UserList
      v-loading="pending"
      class="ModalGroupCreateAddUsers__user-list"
      :header-visible="false"
      :columns="columns"
      :users="users"
      :selected-users.sync="selectedUsers"
      :total="totalUserCount"
      @page-changed="onPageChanged" />
    <span class="no-data" v-show="!hasUsers && !pending">{{ $t('message.noData.search') }}</span>
  </ModalForm>
</template>

<script>
import ModalForm from '@/components/dashboard/modals/ModalForm'
import UserProvider from '@/services/UserProvider'
import UserList from '@/components/user/UserList'

const userProvider = new UserProvider({
  fields: [
    'id',
    'firstname',
    'lastname',
    'email'
  ],
  orderBy: 'firstname',
  pageSize: 5
})

export default {
  components: {
    ModalForm,
    UserList
  },

  computed: {
    hasUsers () {
      return this.users.length
    },
    createGroupLabel () {
      const count = this.selectedUsers.length
      return this.$tc('button.createGroupWithPeoples', count, { count })
    }
  },

  data () {
    return {
      pending: false,
      users: [],
      selectedUsers: [],
      currentPage: 1,
      totalUserCount: 0,
      form: {
        query: ''
      },
      columns: [
        {
          slot: 'full-name',
          grow: 5
        },
        {
          prop: 'email',
          grow: 8
        }
      ]
    }
  },

  watch: {
    async 'form.query' (newValue) {
      if (newValue.length >= 2) {
        this.searching = true
        await this.$store.dispatch('user/search', { page: 1, query: newValue })
        this.searching = false
      } else if (newValue.length === 0) {
        this.searching = true
        await this.$store.dispatch('user/list', { page: this.currentPage })
        this.searching = false
      }
    }
  },

  async mounted () {
    this.fetchUsers()
  },

  methods: {
    async fetchUsers () {
      this.pending = true
      const { data: response } = await userProvider.list({
        page: this.currentPage
      })
      if (response) {
        this.users = response.data
        this.totalUserCount = response.total
      }
      this.pending = false
    },

    onUserSelected (user) {
      const id = user && user.id
      if (id && !this.selectedUsers.includes(id)) {
        this.selectedUsers.push(id)
      }
    },

    onUserUnselected (user) {
      const id = user && user.id
      const users = this.selectedUsers
      if (id && users.includes(id)) {
        const index = users.indexOf(id)
        if (index > -1) {
          users.splice(index, 1)
        }
        this.selectedUsers = users
      }
    },

    async onPageChanged (page) {
      this.currentPage = page
      this.fetchUsers()
    },

    formValidated () {
      this.$emit('usersAdded', this.selectedUsers)
    }
  }
}
</script>

<style lang="scss" scoped>
.ModalGroupCreateAddUsersList {
  margin-bottom: 2em;
  min-height: 50px;
}
</style>
