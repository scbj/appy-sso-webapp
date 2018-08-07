<template>
  <ModalForm
    :model="form"
    :primary-button-text="primaryButtonText"
    @validated="formValidated"
    class="ModalFormAddUsers">
    <el-form-item :label="$t('label.addUsers')" prop="query">
      <el-input
        v-model="form.query"
        :placeholder="$t('placeholder.search')"
        prefix-icon="el-icon-search" />
    </el-form-item>
    <UserList
      v-loading="pending"
      :header-visible="false"
      :columns="columns"
      :users="users"
      :selected-users.sync="selectedUsers"
      :total="totalUserCount"
      :page-size="5"
      @page-changed="onPageChanged" />
    <span
      v-show="!hasUsers && !pending"
      v-text="$t('message.noData.search')"
      class="no-data" />
  </ModalForm>
</template>

<script>
import ModalForm from '@/components/dashboard/modals/ModalForm'
import UserProvider from '@/services/UserProvider'
import UserList from '@/components/user/UserList'

const userProvider = new UserProvider({
  fields: [ 'id', 'firstname', 'lastname' ],
  orderBy: 'firstname',
  pageSize: 5
})

export default {
  components: {
    ModalForm,
    UserList
  },

  props: {
    primaryButtonTextResourceName: {
      type: String,
      required: true
    }
  },

  computed: {
    hasUsers () {
      return this.users.length
    },
    primaryButtonText () {
      const count = this.selectedUsers.length
      return this.$tc(this.primaryButtonTextResourceName, count, { count })
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
          grow: 2,
          prop: 'roleName',
          slot: 'role'
        }
      ]
    }
  },

  watch: {
    async 'form.query' (newValue) {
      if (newValue.length === 0) {
        this.pending = true
        await this.fetchUsers()
      } else if (newValue.length >= 2) {
        this.pending = true
        await this.searchUsers()
      }
      this.pending = false
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

    async searchUsers () {
      const { query } = this.form
      const { data: response } = await userProvider.search({ query })
      if (response) {
        this.users = response.data
        this.totalUserCount = response.total
      }
    },

    async onPageChanged (page) {
      this.currentPage = page
      this.fetchUsers()
    },

    formValidated () {
      this.$emit('users-added', this.selectedUsers)
    }
  }
}
</script>

<style lang="scss" scoped>
.ModalFormAddUsers {
  min-height: 50px;
}
</style>
