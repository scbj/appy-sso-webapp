<template lang="pug">
  el-form.modal-group-create-choose-name(
    @submit.native.prevent=''
    ref='form'
    :model='form'
    status-icon )
    el-form-item( prop='query' :label="$t('addPeople')" )
      el-input(
        ref='searchInput'
        v-model='form.query'
        prefix-icon="el-icon-search"
        :placeholder="$t('placeholder.search')" )
    ModalGroupCreateAddUsersList.user-list(
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
    el-form-item.buttons
      el-button( type='text' @click="$emit('requestClose')" ) {{ $t('cancel') }}
      el-button( type='primary' @click='createGroup' ) {{ createGroupLabel }}
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import ModalGroupCreateAddUsersList from './ModalGroupCreateAddUsersList'

const { mapGetters } = createNamespacedHelpers('user')

export default {
  components: {
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
      if (newValue.length > 2) {
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

    createGroup () {
      this.$emit('usersAdded', this.selectedUsers)
    }
  }
}
</script>

<style lang="scss" scoped>
.buttons {
  margin-top: 2rem;
  margin-bottom: 0;
  text-align: right;

  button {
    margin-bottom: 10px;
  }
}

.user-list {
  margin-bottom: 2em;
  min-height: 50px;
}
</style>
