<template lang="pug">
.AdministrationPanelTable
  h2 <span class='number'>34</span> utilisateurs dans le groupe
  h3
    | dont&nbsp;
    el-tooltip
      div( slot='content' )
        div Obi-Wan Kenobi 🌌
        div John Doe
        div Anakin Skywalker 💮
      span.number 2
    | &nbsp;administrateurs
  header.AdministrationPanelTable__header
    div.cell.profil-picture
    div.cell.full-name
      span NOM COMPLET
    div.cell.email
      span EMAIL
    div.cell.role
      span RÔLE
    div.cell.creation-time
      span CRÉÉ IL Y A
    div.cell.modification-time
      span MODIFIÉ IL Y A
  ul
    li.AdministrationPanelTable__row( v-for='user in users' :key='user.id' )
      div.cell.profil-picture
        BaseImage( src='/static/img/default-user-picture.png' )
      div.cell.full-name
        span {{ user.firstname }} {{ user.lastname }}
      div.cell.email
        span {{ user.email }}
      div.cell.role
        el-tag.tag( size='mini' :type='getTagTypeFromRole(user.role_name)' ) {{ user.role_name }}
      div.cell.creation-time
        span {{ relativeTimFromNow(user.created_at) }}
      div.cell.modification-time
        span {{ relativeTimFromNow(user.updated_at  ) }}
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      users: [
        {
          id: 17,
          firstname: 'Abner',
          lastname: "O'Keefe",
          email: "Abner.O'Keefe@example.com",
          role_name: 'standard',
          created_at: new Date(2018, 4, 24, 16, 25, 52),
          updated_at: new Date(2018, 4, 24, 16, 35, 52)
        },
        {
          id: 3,
          firstname: 'Alex',
          lastname: 'Kemmer',
          email: 'Alex.Kemmer@example.com',
          role_name: 'standard',
          created_at: new Date(2018, 2, 12, 20, 45, 52),
          updated_at: new Date(2018, 4, 24, 16, 35, 52)
        },
        {
          id: 6,
          firstname: 'Amari',
          lastname: 'Bruen',
          email: 'Amari.Bruen@example.com',
          role_name: 'standard',
          created_at: new Date(2017, 11, 12, 20, 45, 52),
          updated_at: new Date(2018, 4, 24, 16, 35, 52)
        },
        {
          id: 10,
          firstname: 'Arvel',
          lastname: 'Kertzmann',
          email: 'Arvel.Kertzmann@example.com',
          role_name: 'standard',
          created_at: new Date(2018, 4, 12, 20, 45, 52),
          updated_at: new Date(2018, 4, 24, 16, 35, 52)
        },
        {
          id: 362,
          firstname: 'Benjamin',
          lastname: 'Rosier',
          email: 'benj@rosier@gmail.com',
          role_name: 'standard',
          created_at: new Date(2018, 4, 12, 20, 45, 52),
          updated_at: new Date(2018, 4, 24, 16, 35, 52)
        },
        {
          id: 448,
          firstname: 'Benjamin',
          lastname: 'Rosier',
          email: 'benj@rosierger@gmail.com',
          role_name: 'admin',
          created_at: new Date(2017, 2, 12, 20, 45, 52),
          updated_at: new Date(2018, 4, 24, 16, 35, 52)
        },
        {
          id: 450,
          firstname: 'Benjamin',
          lastname: 'Rosier',
          email: 'benj@ros94ierger@gmail.com',
          role_name: 'standard',
          created_at: new Date(2018, 4, 12, 20, 45, 52),
          updated_at: new Date(2018, 4, 24, 16, 35, 52)
        },
        {
          id: 454,
          firstname: 'Benjamin',
          lastname: 'Rosier',
          email: 'joze@gmail.com',
          role_name: 'standard',
          created_at: new Date(2018, 4, 12, 20, 45, 52),
          updated_at: new Date(2018, 4, 24, 16, 35, 52)
        }
      ]
    }
  },
  methods: {
    getTagTypeFromRole (role) {
      return role === 'admin' ? 'danger' : 'success'
    },

    relativeTimFromNow (date) {
      const momentDate = moment(date)
      momentDate.locale(this.$i18n.locale)
      return momentDate.fromNow(true)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/colors';
@import '../../../assets/scss/vars.scss';

.AdministrationPanelTable {
  background-color: white;
  border-radius: 6px;
  font-size: 1.2rem;
  box-shadow: 0 5px 24px -6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  width: 100%;
  overflow: hidden;

  > h2 {
    font-size: 2rem;
    font-weight: 400;
    margin: 1rem 0 0 2rem;

    > .number {
      font-size: 3rem;
      font-weight: 600;
      margin-right: 1rem;
    }
  }

  > h3 {
    color: #A250E5;
    font-size: 1.4rem;
    font-weight: 400;
    margin: 0 0 1rem 2rem;

    > .number {
      cursor: help;
      font-size: 1.5rem;
      font-weight: 600;
      position: relative;
    }
  }

  .cell {
    min-width: 0;
    padding: 0 .5em;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 3rem;
    overflow: hidden;

    > span {

      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &.full-name { width: 33%; }
    &.email { width: 47%; }
    &.role { width: 20%; }

    &.profil-picture,
    &.creation-time,
    &.modification-time {
      display: none;
    }

    @media screen and (min-width: 850px) {
      &.full-name { width: 33%; }
      &.email { width: 43%; }
      &.role { width: 14%; }

      &.profil-picture {
        display: flex;
        width: 10%;
      }
    }

    @media screen and (min-width: 1100px) {
      &.full-name { width: 30%; }
      &.email { width: 42%; }
      &.role { width: 10%; }
      &.profil-picture { width: 8%; }

      &.modification-time {
        display: flex;
        width: 10%;
      }
    }

    @media screen and (min-width: 1100px) {
      &.full-name { width: 26%; }
      &.email { width: 41%; }
      &.role { width: 8%; }
      &.profil-picture { width: 5%; }
      &.modification-time { width: 10%; }

      &.creation-time {
        display: flex;
        width: 10%;
      }
    }
  }
}

.AdministrationPanelTable__header {
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

.AdministrationPanelTable__row {
  background-color: transparent;
  border-radius: 6px;
  display: flex;
  width: 100%;
  transition: all .2s ease-in-out;

  &:hover {
    color: #A250E5;
    background-color: rgba(162, 80, 229, 0.1);
    // box-shadow: 0 2px 17px -3px rgba(0, 0, 0, 0.1);
    transition: all .1s ease-in;
  }

  >.full-name {
    font-weight: 500;
  }

  > .profil-picture {
    justify-content: center;

    > .BaseImage {
      $size: 24px;
      border-radius: 50%;
      width: $size;
      height: $size;
    }
  }
}

.row-border-bottom {
  border-bottom: 1px solid rgba(#384759, .08);
}
</style>
