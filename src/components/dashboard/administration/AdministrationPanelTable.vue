<template lang="pug">
.administration-panel-table
  .header.firstname Prénom
  .header.lastname Nom
  .header.email Mail
  template( v-for='user in users' )
    .cell( :class='{ dot: user.role_id === 2 }' )
      span.cell.firstname {{ user.firstname }}
      el-tag.tag( v-if='isAdmin(user)' size='mini' type='danger' ) admin
    span.cell.lastname {{ user.lastname }}
    span.cell.email {{ user.email }}
    .row-border-bottom
</template>

<script>
export default {
  data () {
    return {
      users: [
        {
          firstname: 'Giles',
          lastname: 'Dietrich',
          email: 'giles.dietrich@example.com',
          role_id: 3
        },
        {
          firstname: 'Seamus',
          lastname: 'Cassin',
          email: 'seamus.cassin@example.com',
          role_id: 3
        },
        {
          firstname: 'Russel',
          lastname: 'Harber',
          email: 'russel.harber@example.com',
          role_id: 2
        },
        {
          firstname: 'Warren',
          lastname: 'Schmidt',
          email: 'warren.schmidt@example.com',
          role_id: 3
        },
        {
          firstname: 'Eleazar',
          lastname: 'Waelchi',
          email: 'eleazar.waelchi@example.com',
          role_id: 2
        },
        {
          firstname: 'Horace',
          lastname: 'Halvorson',
          email: 'horace.halvorson@example.com',
          role_id: 3
        }
      ]
    }
  },
  methods: {
    isAdmin (user) {
      const admin = 2
      return !!(user && user.role_id === admin)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../assets/scss/colors';

.administration-panel-table {
  display: grid;
  grid-template-columns:
    minmax(0, 2fr) minmax(0, 2fr) minmax(0, 3fr);
  grid-column-gap: 1em;
  align-items: center;
}

.row-border-bottom {
  grid-column: span 3;
  border-bottom: 1px solid rgba(#384759, .08);
}

.header {
  user-select: none;
  font-size: 1.2rem;
  font-weight: 600;
  padding: .5em 0;
}

div.cell {
  display: flex;
  align-items: center;

  .tag {
    margin-left: 1rem;
  }
}

span.cell {
  position: relative;
  overflow: hidden;
  white-space:nowrap;
  text-overflow:ellipsis;
  font-size: 1.2rem;
  padding: .5em 0;
}
</style>
