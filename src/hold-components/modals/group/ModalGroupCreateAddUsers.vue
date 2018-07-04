<template lang="pug">
ModalForm.ModalGroupCreateAddUsers(
  :model='form'
  :primaryButtonText='createGroupLabel'
  @validated='formValidated' )
    el-form-item( prop='query' :label="$t('addPeople')" )
      el-input(
        ref='searchInput'
        v-model='form.query'
        prefix-icon="el-icon-search"
        :placeholder="$t('placeholder.search')" )
    ModalGroupCreateAddUsersList(
      v-loading='searching'
      v-show='hasUsers'
      :users='users'
      :selected-users='selectedUsers'
      @userSelected='onUserSelected'
      @userUnselected='onUserUnselected' )
    el-pagination(
      v-show='hasUsers'
      background
      layout='prev, pager, next'
      :total='total'
      :current-page='currentPage'
      :page-size='perPage'
      @current-change='changePage' )
    span.no-data( v-show='!hasUsers && !searching' ) {{ $t('message.noData.search') }}
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import ModalForm from '@/hold-components/modals/ModalForm'
import ModalGroupCreateAddUsersList from './ModalGroupCreateAddUsersList'

const { mapGetters } = createNamespacedHelpers('user')

export default {
  components: {
    ModalForm,
    ModalGroupCreateAddUsersList
  },

  computed: {
    ...mapGetters([
      'currentPage',
      'total',
      'perPage',
      'users'
    ]),
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
      searching: false,
      form: {
        query: ''
      },
      selectedUsers: []
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
    this.searching = true
    await this.$store.dispatch('user/list', { page: this.currentPage })
    this.searching = false
  },

  methods: {
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

    async changePage (page) {
      this.searching = true
      await this.$store.dispatch('user/list', { page })
      this.searching = false
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
