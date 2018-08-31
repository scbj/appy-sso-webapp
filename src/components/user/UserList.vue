<template>
  <div class="UserList">
    <UserListHeader v-if="headerVisible" />
    <ul>
      <UserListRow
        v-for="user in users"
        :key="user.id"
        :user="user"
        :selected="isSelected(user)"
        @selection-changed="onSelectionChanged(user, $event)">
        <template slot="profil-picture" slot-scope="{ user }">
          <BaseImage
            :src="user.pictureUrl"
            :fallback-src="require('@/assets/img/default-user-picture.png')"
            class="UserListRow__profil-picture" />
        </template>
        <template slot="full-name" slot-scope="{ user }">
          <span class="UserListRow__full-name" @click="openUserDetails(user)">
            <template v-if="user.activated">
              {{ user.firstname }}
              <span class="UserListRow__lastname">{{ user.lastname }}</span>
            </template>
            <span v-else class="UserListRow__guest-user">{{ $t('title.guestUser') }}</span>
          </span>
        </template>
        <template slot="date" slot-scope="{ value }">
          <BaseDate :date="value" :suffix="showDateSuffix" />
        </template>
        <template slot="role" slot-scope="{ value }">
          <el-tag :type="getTagTypeFromRole(value)" siz="mini">
            {{ user.roleName }}
          </el-tag>
        </template>
      </UserListRow>
    </ul>
    <UserListPagination
      v-if="shouldAllowPagination"
      :total="total"
      :page-size="pageSize" />
  </div>
</template>

<script>
import ResizeObserver from 'resize-observer-polyfill'
import throttle from 'lodash.throttle'

import UserListHeader from './UserListHeader'
import UserListRow from './UserListRow'
import UserListPagination from './UserListPagination'

export default {
  components: {
    UserListHeader,
    UserListRow,
    UserListPagination
  },

  props: {
    columns: {
      type: Array,
      required: true
    },
    /** The list of users to display. */
    users: {
      type: Array,
      required: true
    },
    /** The list of id of the selected users. */
    selectedUsers: {
      type: Array,
      default: () => []
    },
    /** Total item count. */
    total: {
      type: Number,
      required: true
    },
    /** Determines whether to display headers or not. */
    headerVisible: {
      type: Boolean,
      default: true
    },
    /** Item count of each page. */
    pageSize: {
      type: Number,
      default: 8
    }
  },

  data () {
    return {
      width: 0
    }
  },

  computed: {
    selectionModeEnabled () {
      // TODO: A voir si cette fonctionnalité peut être implémenté sans être confuse (est-ce que ça sélectionne tout les utilisateurs ou les utilisateurs visible dans la liste, la page).
      return false
      // return this.selectedUsers.length > 0
    },

    shouldAllowPagination () {
      return this.total && this.total > this.users.length
    },

    showDateSuffix () {
      return !this.headerVisible
    }
  },

  mounted () {
    this.initializeResizeObserver()
  },

  methods: {
    // TODO: Utiliser des mixins pour cette méthode et pour la props 'columns'
    getCellStyle (column) {
      let style = {
        flexGrow: column.grow
      }

      // We must hide this column if the breakpoint has not been reached
      if (column.breakpointWidth > this.width) {
        style.display = 'none'
      }

      return style
    },

    getTagTypeFromRole (role) {
      switch (role) {
        case 'standard': return 'success'
        case 'admin': return 'danger'
        default: return 'warning'
      }
    },

    initializeResizeObserver () {
      const handleResize = throttle(entries => {
        const cr = entries[0].contentRect
        this.width = cr.width
      }, 400)

      const observer = new ResizeObserver(handleResize)
      observer.observe(this.$el)
    },

    isSelected (user) {
      const { id } = user
      return this.selectedUsers.includes(id)
    },

    onSelectionChanged (user, selected) {
      selected
        ? this.selectUser(user)
        : this.unselectUser(user)
    },

    selectUser (user) {
      const { id } = user
      if (!this.selectedUsers.includes(id)) {
        const selectedUsers = [...this.selectedUsers, id]
        this.$emit('update:selectedUsers', selectedUsers)
      }
    },

    unselectUser (user) {
      const { id } = user
      const index = this.selectedUsers.indexOf(id)
      if (index !== -1) {
        // Remove the element at specified index from the array
        const selectedUsers = [...this.selectedUsers]
        selectedUsers.splice(index, 1)
        this.$emit('update:selectedUsers', selectedUsers)
      }
    },

    openUserDetails (user) {
      this.$store.dispatch('ui/dashboard/openUserDetails', { user })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/mixins.scss';

.UserListRow__profil-picture {
  border-radius: 50%;
  margin: auto;
  @include size(24px)
}

.UserListRow__full-name {
  user-select: text;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .UserListRow__lastname { font-weight: 600 }
  .UserListRow__guest-user { font-style: italic; }
}
</style>
