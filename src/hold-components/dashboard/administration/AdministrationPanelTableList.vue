<template lang="pug">
.AdministrationPanelTableList
  header.AdministrationPanelTableList__header
    div.AdministrationPanelTableList__cell.actions
      el-checkbox( style='visibility:hidden' )
    div.AdministrationPanelTableList__cell.profil-picture
    div.AdministrationPanelTableList__cell.full-name
      span {{ $t('header.fullName') }}
    div.AdministrationPanelTableList__cell.email
      span {{ $t('header.email') }}
    div.AdministrationPanelTableList__cell.role
      span {{ $t('header.role') }}
    div.AdministrationPanelTableList__cell.created-at
      span {{ $t('header.createdAt') }}
    div.AdministrationPanelTableList__cell.modified-at
      span {{ $t('header.modifiedAt') }}
  ul( v-loading='pending' )
    li.AdministrationPanelTableList__row(
      v-for='user in users'
      :key='user.id'
      :class="{ 'super-admin': isSuperAdmin(user) }" )
      div.AdministrationPanelTableList__cell.actions
        el-checkbox( :checked='isSelected(user.id)' @change='changeSelection(user, $event)' )
      div.AdministrationPanelTableList__cell.profil-picture
        BaseImage( src='/static/img/default-user-picture.png' )
      div.AdministrationPanelTableList__cell.full-name
        span {{ user.firstname }}&nbsp;
          span.lastname {{ user.lastname }}
      div.AdministrationPanelTableList__cell.email
        span {{ user.email }}
      div.AdministrationPanelTableList__cell.role
        el-tag.tag( size='mini' :type='getTagTypeFromRole(user.role_name)' ) {{ user.role_name }}
      div.AdministrationPanelTableList__cell.created-at
        span( :title='formatDate(user.created_at)' ) {{ relativeTimFromNow(user.created_at) }}
      div.AdministrationPanelTableList__cell.modified-at
        span( :title='formatDate(user.updated_at)' ) {{ relativeTimFromNow(user.updated_at  ) }}
  p.selection-info( v-if='selectionModeEnabled' ) {{ selectionInfoText }}
</template>

<script>
import moment from 'moment'
import { get, sync } from 'vuex-pathify'

export default {
  computed: {
    users: get('dashboardAdministration/users'),
    selectedUsers: sync('dashboardAdministration/selectedUsers'),
    pending: get('dashboardAdministration/pending'),

    selectionModeEnabled () {
      return this.selectedUsers.length > 0
    },

    selectionInfoText () {
      // The user must be informed of the state of his selection
      const count = this.selectedUsers.length
      return this.$tc('message.selectionCount', count, { count })
    }
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

$color-highlight: $primaryColor;
$background-highlight: rgba($color-highlight, 0.1);

@mixin transition-enter ($transition-property) {
  transition: $transition-property .05s ease-in;
}

@mixin transition-leave ($transition-property) {
  transition: $transition-property .1s ease-in-out;
}

@mixin set-columns-weight (
  $profil-picture,
  $full-name,
  $email,
  $role,
  $created-at,
  $modified-at) {
  &.profil-picture { flex: $profil-picture }
  &.full-name { flex: $full-name }
  &.email { flex: $email }
  &.role { flex: $role }
  &.created-at { flex: $created-at }
  &.modified-at { flex: $modified-at }
}

.AdministrationPanelTableList__cell {
  @include set-columns-weight(0, 2, 3, 1, 0, 0);
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

  &.profil-picture,
  &.created-at,
  &.modified-at {
    display: none;
  }

  // The wider the width allows, the more we need
  // to display user information about the user
  @media screen and (min-width: 850px) {
    @include set-columns-weight(1, 3.3, 4.3, 1.4, 0, 0);
    &.profil-picture { display: flex; }
  }

  @media screen and (min-width: 1100px) {
    @include set-columns-weight(.8, 3, 4.2, 1, 0, 1);
    &.modified-at { display: flex; }
  }

  @media screen and (min-width: 1250px) {
    @include set-columns-weight(.5, 2.5, 4, .8, 1, 1);
    &.created-at { display: flex; }
  }
}

.AdministrationPanelTableList__header {
  color: $color-highlight;
  font-size: .8em;
  font-weight: 400;
  display: flex;
  width: 100%;
  user-select: none;

  .AdministrationPanelTableList__cell {
    height: 4rem;
  }
}

.AdministrationPanelTableList__row {
  @include transition-leave(all);
  background-color: transparent;
  border-radius: 6px;
  display: flex;
  width: 100%;

  // We must highlight the super administrator in the list
  &.super-admin { color: red; }

  // When the mouse is over a user, we must reveal the
  // checkbox and highlight the corresponding line
  &:hover {
    color: $color-highlight;
    background-color: $background-highlight;
    @include transition-enter(all);

    &.super-admin { color: red; }

    .AdministrationPanelTableList__cell.actions > .el-checkbox {
      opacity: 1;
      @include transition-enter(opacity);
    }
  }
}

// The columns. Represented by cells
.AdministrationPanelTableList__row > .AdministrationPanelTableList__cell {
  // When a user is not selected, we must shown
  // to the user the checkbox when the mouse is
  // over the corresponding line
  &.actions .el-checkbox {
    @include transition-leave(opacity);
    opacity: 0;

    &.is-checked { opacity: 1 }
  }

  // This cell must display the full name, ie
  // the first name followed by the last name
  &.full-name > span {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }

    .lastname { font-weight: 600 }
  }

  // Each user must be easily identifiable
  // thanks to his profile picture
  &.profil-picture {
    justify-content: center;
    user-select: none;

    .BaseImage {
      $size: 24px;
      border-radius: 50%;
      width: $size;
      height: $size;
    }
  }
}

.AdministrationPanelTableList__button {
  color: $primaryColor;
}

.selection-info {
  margin: 1rem 0 1rem 2rem;
}

</style>
