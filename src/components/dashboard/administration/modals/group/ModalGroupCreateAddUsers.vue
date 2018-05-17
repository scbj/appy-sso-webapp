<template lang="pug">
  el-form.modal-group-create-choose-name(
    v-loading='busy'
    @submit.native.prevent=''
    ref='form'
    :model='form'
    status-icon )
    el-form-item( prop='query' label='Ajouter des personnes' )
      el-input(
        v-model='form.query'
        prefix-icon="el-icon-search"
        placeholder='Rechercher un nom, prénom ou email' )
    ModalGroupCreateAddUsersList.user-list(
      :users='users'
      :selected-users='selectedUsers'
      @userSelected='onUserSelected'
      @userUnselected='onUserUnselected' )
    el-pagination(
      background
      layout='prev, pager, next'
      :total='total'
      :current-page='currentPage'
      :page-size='perPage'
      @current-change='changePage' )
    el-form-item.buttons
      el-button( type='text' @click="$emit('requestClose')" ) Annuler
      el-button( type='primary' @click='createGroup' ) Créer
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
    ])
  },

  data () {
    return {
      busy: false,
      form: {
        query: ''
      },
      selectedUsers: []
    }
  },

  watch: {
    'form.query' (newValue) {
      console.log(newValue)
    }
  },

  created () {
    this.$store.dispatch('user/list', { page: 1 })
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

    changePage (page) {
      this.$store.dispatch('user/list', { page })
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
}
</style>
