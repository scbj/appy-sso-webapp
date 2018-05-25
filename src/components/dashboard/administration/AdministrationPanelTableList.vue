<template lang="pug">
.AdministrationPanelTableList
  header.AdministrationPanelTableList__header
    div.cell.actions
      el-checkbox( style='visibility:hidden' )
    div.cell.profil-picture
    div.cell.full-name
      span PRÉNOM ET NOM
    div.cell.email
      span EMAIL
    div.cell.role
      span RÔLE
    div.cell.creation-time
      span CRÉÉ IL Y A
    div.cell.modification-time
      span MODIFIÉ IL Y A
  ul( v-loading='pending' )
    li.AdministrationPanelTableList__row(
      v-for='user in users'
      :key='user.id'
      :class="{ 'super-admin': isSuperAdmin(user) }" )
      div.cell.actions
        el-checkbox( :checked='isSelected(user.id)' @change='changeSelection(user, $event)' )
      div.cell.profil-picture
        BaseImage( src='/static/img/default-user-picture.png' )
      div.cell.full-name
        span {{ user.firstname }}&nbsp;
          span.lastname {{ user.lastname }}
      div.cell.email
        span {{ user.email }}
      div.cell.role
        el-tag.tag( size='mini' :type='getTagTypeFromRole(user.role_name)' ) {{ user.role_name }}
      div.cell.creation-time
        span( :title='formatDate(user.created_at)' ) {{ relativeTimFromNow(user.created_at) }}
      div.cell.modification-time
        span( :title='formatDate(user.updated_at)' ) {{ relativeTimFromNow(user.updated_at  ) }}
</template>

<script>
import moment from 'moment'
import { get, sync } from 'vuex-pathify'

export default {
  computed: {
    users: get('dashboardAdministration/users'),
    selectedUsers: sync('dashboardAdministration/selectedUsers'),
    pending: get('dashboardAdministration/pending')
  },

  methods: {
    getTagTypeFromRole (role) {
      switch (role) {
        case 'standard': return 'success'
        case 'admin': return 'danger'
        default: return 'warning'
      }
    },

    formatDate (date) {
      return moment(date).format()
    },

    relativeTimFromNow (date) {
      const momentDate = moment(date)
      momentDate.locale(this.$i18n.locale)
      return momentDate.fromNow(true)
    },

    isSelected (id) {
      return this.selectedUsers.includes(id)
    },

    isSuperAdmin (user) {
      return user && user.role_name === 'superAdmin'
    },

    changeSelection (user, isChecked) {
      isChecked
        ? this.selectUser(user)
        : this.unselectUser(user)
    },

    selectUser (user) {
      this.selectedUsers.push(user.id)

      // Force vuex to detect Array changes
      this.selectedUsers = this.selectedUsers
    },

    unselectUser (user) {
      const index = this.selectedUsers.indexOf(user.id)
      if (index !== -1) {
        this.selectedUsers.splice(index, 1)

        // Force vuex to detect Array changes
        this.selectedUsers = this.selectedUsers
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/colors';
@import '../../../assets/scss/vars.scss';

.AdministrationPanelTableList {
  .cell {
    min-width: 0;
    padding: 0 .8rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 3.2rem;
    overflow: hidden;

    > span {

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &.full-name { flex: 2 }
    &.email { flex: 3 }
    &.role { flex: 1 }

    &.profil-picture,
    &.creation-time,
    &.modification-time {
      display: none;
    }

    @media screen and (min-width: 850px) {
      &.full-name { flex: 3.3 }
      &.email { flex: 4.3 }
      &.role { flex: 1.4 }

      &.profil-picture {
        display: flex;
        flex: 1;
      }
    }

    @media screen and (min-width: 1100px) {
      &.full-name { flex: 3 }
      &.email { flex: 4.2 }
      &.role { flex: 1 }
      &.profil-picture { flex: 0.8 }

      &.modification-time {
        display: flex;
        flex: 1;
      }
    }

    @media screen and (min-width: 1250px) {
      &.full-name { flex: 2.5 }
      &.email { flex: 4 }
      &.role { flex: 0.8 }
      &.profil-picture { flex: 0.5 }
      &.modification-time { flex: 1 }

      &.creation-time {
        display: flex;
        flex: 1;
      }
    }
  }
}

.AdministrationPanelTableList__header {
  color: #A250E5;
  font-size: .8em;
  font-weight: 400;
  display: flex;
  width: 100%;
  user-select: none;

  > .cell {
    height: 4rem;
  }
}

.AdministrationPanelTableList__row {
  background-color: transparent;
  border-radius: 6px;
  display: flex;
  width: 100%;
  transition: all .2s ease-in-out;

  &.super-admin {
    color: red;
  }

  &:hover {
    color: #A250E5;
    background-color: rgba(162, 80, 229, 0.1);
    transition: all .1s ease-in;

    &.super-admin {
      color: red;
    }
  }

  > .full-name > span {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }

    > .lastname {
      font-weight: 600
    }
  }

  > .profil-picture {
    justify-content: center;
    user-select: none;

    > .BaseImage {
      $size: 24px;
      border-radius: 50%;
      width: $size;
      height: $size;
    }
  }
}
</style>
